// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  files: ['**/*.{ts,tsx}'],
  plugins: { 'simple-import-sort': simpleImportSortPlugin },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'comma-spacing': ['error', { before: false, after: true }]
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactHooksPlugin.configs.flat.recommended
  ],
  // Base the version of react on the dependencies
  settings: { react: { version: packageJson.dependencies.react } }
});
