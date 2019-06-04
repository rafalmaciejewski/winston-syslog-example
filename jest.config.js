module.exports = {
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: './coverage',
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    rootDir: './',
    testRegex: '.test.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};
