import { getPath } from '../pathHelper'
import { fileURLToPath } from 'url'  // Required for mocking
import { dirname, join } from 'path' // Required for mocking

jest.mock('url', () => ({
    fileURLToPath: jest.fn(),
}))

jest.mock('path', () => ({
    dirname: jest.fn(),
    join: jest.fn(),
}))

describe('getPath', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks()
    })

    test('should return the correct path based on importMetaUrl and relativePath', () => {
        const mockFileName = '/mock/dir/file.js'
        const mockDirName = '/mock/dir'
        const mockRelativePath = 'assets/image.png'
        const expectedPath = '/mock/dir/assets/image.png'

        // Mock the behavior of fileURLToPath and dirname
        fileURLToPath.mockReturnValue(mockFileName)
        dirname.mockReturnValue(mockDirName)
        join.mockReturnValue(expectedPath)

        // Call the function
        const result = getPath('mockImportMetaUrl', mockRelativePath)

        // Assert the result
        expect(fileURLToPath).toHaveBeenCalledWith('mockImportMetaUrl')
        expect(dirname).toHaveBeenCalledWith(mockFileName)
        expect(join).toHaveBeenCalledWith(mockDirName, mockRelativePath)
        expect(result).toBe(expectedPath)
    })

    test('should handle different relative paths correctly', () => {
        const mockFileName = '/mock/dir/file.js'
        const mockDirName = '/mock/dir'
        const mockRelativePath = '../config/settings.json'
        const expectedPath = '/mock/config/settings.json'

        // Mock the behavior of fileURLToPath and dirname
        fileURLToPath.mockReturnValue(mockFileName)
        dirname.mockReturnValue(mockDirName)
        join.mockReturnValue(expectedPath)

        // Call the function with a different relative path
        const result = getPath('mockImportMetaUrl', mockRelativePath)

        // Assert the result
        expect(fileURLToPath).toHaveBeenCalledWith('mockImportMetaUrl')
        expect(dirname).toHaveBeenCalledWith(mockFileName)
        expect(join).toHaveBeenCalledWith(mockDirName, mockRelativePath)
        expect(result).toBe(expectedPath)
    })
})