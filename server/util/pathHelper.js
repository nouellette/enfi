import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export function getPath(importMetaUrl, relativePath) {
    const __filename = fileURLToPath(importMetaUrl)
    const __dirname = dirname(__filename)
    return join(__dirname, relativePath)
}