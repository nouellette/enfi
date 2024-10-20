import OpenAi from 'openai'

let openai = null

async function callOpenAi(prompt) {
    if (openai === null) {
        openai = new OpenAi({
            apiKey: process.env.OPENAI_KEY,
        })
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // gpt-40 gpt-4 gpt-4-turbo
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0
        })

        return response.choices[0].message.content
    } catch (error) {
        console.error('Error calling OpenAI API:', error)
    }
}

export default callOpenAi