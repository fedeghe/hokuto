// const eslint = require("@eslint/js");

module.exports = [{
    name:'xxx',
    files: ["**/*.js" ],
    rules: {
        // ...eslint.configs.recommended.rules,
        "max-len": ["error", { "code": 160 }],
        "no-unused-vars": ["error", { "vars": "local", "args": "all" }],
        "semi": ["error"],
        "func-names": ["error", "never"]
    },
    ignores: ["dist/index.js", "coverage/", "tests/", "jest.config.js"]
}];