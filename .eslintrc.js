module.exports = {
  "root": true,
  "ignorePatterns": ["dist/**/*"],
  "parserOptions": {
    "tsconfigRootDir": __dirname,
    "project": [
      "tsconfig.app.json",
    ],
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended",
        "plugin:@ngrx/recommended-requiring-type-checking"
      ],
      "rules": {
        "@typescript-eslint/no-unused-vars": "error",
        "@ngrx/prefix-selectors-with-select": "off",
        "no-unused-vars": "off"
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended"
      ],
      "rules": {}
    },
  ]
}
