const getMimeType = (ext) => {
    switch (ext) {
        case '.html':
            return 'text/html'
        case '.js':
            return 'application/javascript'
        case '.css':
            return 'text/css'
        case '.json':
            return 'application/json'
        case '.png':
            return 'image/png'
        case '.jpg':
            return 'image/jpeg'
        case '.svg':
            return 'image/svg+xml'
        default:
            return 'text/plain'
    }
}

export default getMimeType