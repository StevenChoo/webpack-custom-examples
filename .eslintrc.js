/*
 * Copyright 2018 Asknow Solutions B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  plugins: [],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.dev.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never'
    }],
    // Max line length for this project is 120
    // Due to expected use of idea but still maintain cognitive readability
    'max-len': ['error', { 'code': 120 }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        '$state', // for vuex state ($ param notation)
        'acc', // for reduce accumulators
        'e', // for e.returnvalue,
        '$memo' // for underscore reduce
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'padded-blocks': ['error', {
      'blocks': 'never',
      'classes': 'always'
    }],
    // Only warn about 'var foo = {bar: require('foo.bar')};'
    // Code is more cleaner allowing it
    // https://github.com/eslint/eslint/issues/5773
    'global-require': 'warn',
    // Function (and thus classes also) declarations are hoisted to the top by default in ES5
    // For readability we want a need a logical order of defining functions in code
    'no-use-before-define': ['error', {
      'functions': false,
      'classes': false,
    }],
    // Prefer warn over error. When using callbacks function on framework api`s is better to show the full api args (if not to many)
    'no-unused-vars': 'warn',
    // We do not require templating over string concatenation due to line requirement conflict
    'prefer-template': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  'overrides': [
    {
      // Vue specific overrides
      'files': ['**/*.vue'],
      'rules': {
        'indent': 'off',
        // Set on warn due to bugs, not calculating correct indentation
        'vue/script-indent': ['warn', 2, {
          'baseIndent': 1
        }],
        // Due to templating and HTML in it, setting it to warn
        'max-len': 'warn',
        // Override default of 1
        'vue/max-attributes-per-line': [2, {
          'singleline': 4,
          'multiline': {
            'max': 4,
            'allowFirstLine': true
          }
        }]
      }
    }
  ]
};
