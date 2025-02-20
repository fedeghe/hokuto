module.exports = {
    "testEnvironment": "jest-environment-jsdom",
    "testEnvironmentOptions": {
        "html": "<html><div id='target'><div data-testid='visible'>loading</div></div></html>"
    },
    "collectCoverage": true,
    "coverageReporters": ["lcov", "json", "html"],
    "clearMocks": true,
    verbose: true
}