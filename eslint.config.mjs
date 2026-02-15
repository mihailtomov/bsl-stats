// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  files: ['**/*.{ts,tsx}'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactHooksPlugin.configs.flat.recommended
  ],
  // Base the version of react on the dependencies
  settings: { react: { version: packageJson.dependencies.react } }
});
