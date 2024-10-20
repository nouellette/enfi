module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.js$': 'babel-jest',  // Use Babel to transform JavaScript files
    },
}