# eslint-plugin-spacedout

spacedout uses these `--fix`able eslint rules in order to paper over some decisions that prettier makes about whitespace. We love whitespace. Here are some rules to enforce whitespace in your codebase.

## installation

```shell
yarn add @spacedout/eslint-plugin-spacedout
```

## config

because we use [flow](https://flow.org) features, you need `babel-eslint` as the parser and you need to add the `spacedout` eslint plugin.

```json
{
  "parser": "babel-eslint",
  "plugins": [
    "spacedout"
  ]
}
```

## rules

**whitespace-after-imports**

* `--fix`able

The default for this rule adds two blank lines between the last `import` and the first statement.

```json
{
  "rules": {
    "spacedout/whitespace-after-imports": 2
  }
}
```
To require a princely 5 lines, use the config option, like so

```json
{
  "rules": {
    "spacedout/whitespace-after-imports": [2, {"lines": 5}]
  }
}
```
