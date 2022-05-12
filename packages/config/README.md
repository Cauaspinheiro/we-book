![Cover image](../../.github/assets/cover.svg)

# WeBook - Configuration package

## 📄 Overview

WeBook is an open-source blog that focuses on creating posts in a collaborative and open way, where anyone can create a post and invite other users to contribute.

### Configuration package

This package contains the default configuration for the Typescript and Eslint tools in Nodejs projects.

For the web projects, see the `web-config` package

## 🏭 Technologies

### Typescript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. (Source: Typescript)

[Official website](https://www.typescriptlang.org/)

### ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. (Source: ESLint)

[Official website](https://github.com/eslint/eslint)

## 💻 Usage

You can use the configuration in this package by add this package in the `package.json` of any project inside this monorepo, in the following way:

```json
{
  "devDependencies": {
    "config": "*"
  }
}
```

Now the config files are available, so you can import using the relative path from the project to this package.
