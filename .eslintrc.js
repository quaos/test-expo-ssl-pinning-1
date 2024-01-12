const path = require("path");

module.exports = {
    root: true,
    env: {
        "react-native/react-native": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin", "unused-imports"],
    settings: {
        "import/resolver": {
            typescript: {
                project: path.join(__dirname, "tsconfig.json"),
            },
        },
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "separate-type-imports",
            },
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
        "prettier/prettier": "error",
        "react/function-component-definition": [
            "error",
            { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
        ],
        "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
        "react-native/no-color-literals": "warn",
        "react-native/no-single-element-style-arrays": "off",
        "import/first": "warn",
        "import/newline-after-import": "warn",
        "import/order": [
            "warn",
            {
                "newlines-between": "always",
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                alphabetize: { order: "asc" },
                warnOnUnassignedImports: true,
            },
        ],
        "sort-imports": ["warn", { ignoreDeclarationSort: true }],
        "unused-imports/no-unused-imports": "error",
        // 'unused-imports/no-unused-vars': [
        //     'error',
        //     {
        //         'vars': 'all',
        //         'varsIgnorePattern': '^_',
        //         'args': 'after-used',
        //         'argsIgnorePattern': '^_'
        //     }
        // ]
    },
    overrides: [
        {
            files: ["*.spec.ts"],
            rules: {
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
        {
            files: ["*.js"],
            env: {
                node: true,
            },
            parser: "",
            parserOptions: {
                sourceType: "commonjs",
            },
            plugins: ["unused-imports"],
            extends: [
                "eslint:recommended",
                "plugin:import/recommended",
                "plugin:prettier/recommended",
            ],
            rules: {
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
    ],
};
