import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import * as importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  {
    // eslint-plugin-react の設定
    settings: {
      react: {
        version: 'detect',
      },
    },
    // recommended に含まれていない eslint-plugin-react のルールを有効化
    rules: {
      'react/destructuring-assignment': 'error', // Props などの分割代入を強制
      'react/hook-use-state': 'error', // useState の返り値の命名を [value, setValue] に統一
      'react/jsx-boolean-value': 'error', // boolean 型の Props の渡し方を統一
      'react/jsx-fragments': 'error', // React Fragment の書き方を統一
      'react/jsx-curly-brace-presence': 'error', // Props と children で不要な中括弧を削除
      'react/jsx-no-useless-fragment': 'error', // 不要な React Fragment を削除
      'react/self-closing-comp': 'error', // 子要素がない場合は自己終了タグを使う
      'react/jsx-pascal-case': 'error', // コンポーネント名をパスカルケースに統一
      'react/no-danger': 'error', // dangerouslySetInnerHTML を許可しない
      'react/prop-types': 'off', // Props の型チェックは TS で行う & 誤検知があるため無効化
      'react/no-unknown-property': [
        'error',
        { ignore: ['uk-icon', 'uk-margin', 'uk-pagination-previous', 'uk-pagination-next'] },
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    // eslint-plugin-react-hooks の設定
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'error', // recommended では warn のため error に上書き
    },
  },
  {
    // eslint-plugin-import の設定
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        // import の並び順を設定
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
        },
      ],
    },
  },
  {
    // eslint-plugin-unused-imports の設定
    plugins: { 'unused-imports': unusedImportsPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // 重複エラーを防ぐため typescript-eslint の方を無効化
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // eslint-plugin-perfectionist の設定
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      'perfectionist/sort-jsx-props': 'warn',
    },
  },
  prettierConfig,
])
