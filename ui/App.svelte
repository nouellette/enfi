<script>
  let questionData = null
  let errorMessage = null
  const plotData = []
  let csvData = []
  let isAbleToDownload = false

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  function reorderAnswers() {
    if (questionData && questionData.questions) {
      questionData.questions.forEach((item) => {
        item.isCorrect = null
        item.llmGuess = ''
        shuffleArray(item.answers)
      })
      questionData = questionData // Force UI update
    }
  }

  function escapeCSV(value) {
    if (Array.isArray(value)) {
      value = value.join(', ')
    }

    value = String(value)

    if (value.includes(',') || value.includes('"')) {
      value = `"${value.replace(/"/g, '""')}"`
    }

    return value
  }

  function convertToCSV(data) {
    const csvRows = []

    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))

    for (const row of data) {
      const values = headers.map(header => escapeCSV(row[header]))
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  function downloadCSV() {
    if (csvData.length > 0) {
      const csvString = convertToCSV(csvData)
      const blob = new Blob([csvString], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'data.csv'
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }

  function updateCharts() {
    if (plotData.length > 0) {
      plotData.forEach((item, idx) => {
        const layout = {
          xaxis: {
            tickmode: 'linear',
            dtick: 1,
          },
          yaxis: {
            tickmode: 'linear',
            dtick: 1,
          },
        }
        Plotly.newPlot(`chart${idx}`, [item], layout)
      })
    }
  }

  function updatePlotInfo(idx, isCorrect) {
    if (plotData[idx]) {
      plotData[idx].y.push(isCorrect ? 1 : 0)
      plotData[idx].x.push(plotData[idx].y.length - 1)
    } else {
      plotData[idx] = {
        x: [0],
        y: [isCorrect ? 1 : 0],
        type: 'scatter'
      }
    }
  }

  async function answerQuestions() {
    if (questionData) {
      try {
        const response = await fetch('/api/answerQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(questionData)
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const results = await response.json()
        if (results) {
          results.forEach((result, idx) => {
            const resultNumber = parseInt(result)
            if (questionData.questions[idx].answers[resultNumber - 1] === questionData.questions[idx].answer) {
              questionData.questions[idx].isCorrect = true
              updatePlotInfo(idx, true)
            } else {
              questionData.questions[idx].isCorrect = false
              updatePlotInfo(idx, false)
            }
            questionData.questions[idx].llmGuess = questionData.questions[idx].answers[resultNumber - 1]
            csvData.push(questionData.questions[idx])
            isAbleToDownload = true
          })
          updateCharts()
        }
        errorMessage = null
      } catch (error) {
        errorMessage = error.message
      }
    }
  }

  async function getQuestions() {
    try {
      const response = await fetch('/api/getQuestions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      questionData = await response.json()
      errorMessage = null
    } catch (error) {
      errorMessage = error.message
    }
  }
  getQuestions()
</script>

<main>
  <top>
    <h1>Order Dependency Problem</h1>
    <div>
      <button on:click={reorderAnswers}>
        Reorder Questions
      </button>
      <button on:click={answerQuestions}>
        Get LLM Answers
      </button>
      {#if isAbleToDownload}
      <button on:click={downloadCSV}>
        Download Results
      </button>
      {/if}
    </div>
  </top>
  <questions>
  {#if questionData}
    <ul>
      {#each questionData.questions as item, chart}
        <li>
          <div class="questionContainer">
            <div>
              <span class="bold">{item.question} ({item.answer})</span>
              {#if item.answers}
                <ul>
                {#each item.answers as answer, idx}
                  {#if item.isCorrect === true}
                    <li class={answer === item.answer ? 'answers green' : 'answers'}>{idx + 1}) {answer}</li>
                  {/if}
                  {#if item.isCorrect === false && item.llmGuess}
                    <li class={item.llmGuess === answer ? 'answers red' : 'answers'}>{idx + 1}) {answer}</li>
                  {/if}
                  {#if item.isCorrect !== true && item.isCorrect !== false}
                    <li class="answers">{idx + 1}) {answer}</li>
                  {/if}
                {/each}
                </ul>
              {/if}
            </div>
            <div id=chart{chart} class="chart"></div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  </questions>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</main>