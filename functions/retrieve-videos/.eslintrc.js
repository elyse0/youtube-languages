module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
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
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
