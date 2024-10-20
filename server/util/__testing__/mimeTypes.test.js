import getMimeType from '../mimeTypes.js'

describe('getMimeType', () => {
    test('should return "text/html" for .html extension', () => {
        expect(getMimeType('.html')).toBe('text/html')
    })

    test('should return "application/javascript" for .js extension', () => {
        expect(getMimeType('.js')).toBe('application/javascript')
    })

    test('should return "text/css" for .css extension', () => {
        expect(getMimeType('.css')).toBe('text/css')
    })

    test('should return "application/json" for .json extension', () => {
        expect(getMimeType('.json')).toBe('application/json')
    })

    test('should return "image/png" for .png extension', () => {
        expect(getMimeType('.png')).toBe('image/png')
    })

    test('should return "image/jpeg" for .jpg extension', () => {
        expect(getMimeType('.jpg')).toBe('image/jpeg')
    })

    test('should return "image/svg+xml" for .svg extension', () => {
        expect(getMimeType('.svg')).toBe('image/svg+xml')
    })

    test('should return "text/plain" for unknown extensions', () => {
        expect(getMimeType('.txt')).toBe('text/plain')
        expect(getMimeType('.unknown')).toBe('text/plain')
    })
})