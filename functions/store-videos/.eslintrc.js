module.exports = {
    ignorePatterns: [".eslintrc.js", "jest.config.js", "tests/**/*"],
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        project: "tsconfig.json",
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    rules: {
        'max-len': 'off',
        indent: ['error', 4],
        'no-console': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
