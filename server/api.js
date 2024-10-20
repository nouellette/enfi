import { readFile, existsSync, readFileSync } from 'fs'
import { extname, resolve } from 'path'
import getMimeType from './util/mimeTypes.js'
import { getPath } from './util/pathHelper.js'
import callOpenAi from './openai.js'
const filePathMcq = getPath(import.meta.url, './data/mcqs.json')
const questions = JSON.parse(readFileSync(filePathMcq, 'utf8'))
const filePathPrompts = getPath(import.meta.url, './data/prompts.json')
const prompts = JSON.parse(readFileSync(filePathPrompts, 'utf8'))

const mainFilePath = 'dist/index.html'

const processStaticFiles = (req, res) => {
    let filePath = req.url === '/' ?  mainFilePath: `dist${req.url}`
    filePath = resolve(filePath)
    const ext = extname(filePath)

    if (!existsSync(filePath) && ext === '') {
        filePath = mainFilePath
    }

    const mimeType = getMimeType(extname(filePath))
    readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('404: Try building the project.\n')
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', mimeType)
            if (ext !== '.html') {
                res.setHeader('Cache-Control', 'public, max-age=31536000')
            }

            res.end(data)
        }
    })
}

const getQuestions = (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(questions))
}

const answerQuestions = (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', async () => {
        const data = JSON.parse(body)
        const promiseArr = []

        data.questions.forEach((item) => {
            let answers = ''
            let idx = 1
            item.answers.forEach((answer) => {
                answers += `${idx}) ${answer} `
                idx += 1
            })
            let newPrompt = `${prompts.simple} ${item.question} ${answers}`
            promiseArr.push(callOpenAi(newPrompt))
        })

        const results = await Promise.all(promiseArr)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(results))
    })
}

const api = (req, res) => {
    const { url } = req
    if (url === '/api/getQuestions') {
        return getQuestions(req, res)
    }

    if (url === '/api/answerQuestions') {
        return answerQuestions(req, res)
    }

    // If we get here we tried all supported routes so try loading resource files
    return processStaticFiles(req, res)
}

export default api