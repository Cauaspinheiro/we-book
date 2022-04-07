import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'config',
        'db',
        'deps',
        'docs',
        'feat',
        'fix',
        'hotfix',
        'lint',
        'merge',
        'perf',
        'refactor',
        'release',
        'revert',
        'script',
        'test',
        'ui',
        'ux',
        'wip',
      ],
    ],
    'scope-enum': [2, 'always', ['apps/blog', 'packages']],
  },
  prompt: {
    questions: {
      type: {
        enum: {
          build: {
            description:
              'changes that affect the build system or external dependencies',
          },
          ci: {
            description: 'changes to our CI configuration files and scripts',
          },
          chore: {
            description:
              "general tasks of the project, that don't change the project at all",
          },
          config: {
            description:
              'changes that update general configuration files, like .eslintrc or .gitignore',
          },
          db: {
            description:
              'changes related to the database changes, like adding a new migration',
          },
          deps: {
            description: 'add, remove or update dependencies',
          },
          docs: {
            description: 'changes that update documentation only',
          },
          feat: {
            description: 'add a new feature to the codebase',
          },
          fix: {
            description: 'fix a bug',
          },
          hotfix: {
            description: 'fix a critical bug',
          },
          lint: {
            description: 'file formatting, missing semi colons, …',
          },
          merge: {
            description: 'merge branches',
          },
          perf: {
            description: 'changes that improve performance',
          },
          refactor: {
            description:
              'changes that refactor the code without changing the final result',
          },
          release: {
            description: 'release / version tags',
          },
          revert: {
            description: 'revert changes or commits',
          },
          script: {
            description: 'changes to our scripts configuration',
          },
          test: {
            description: 'changes related to the test codebase',
          },
          ui: {
            description: 'add or update the UI and style files.',
          },
          ux: {
            description: 'improve user experience / usability.',
          },
          wip: {
            description: 'changes that are still have some work in progress.',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
    },
  },
}

module.exports = config
