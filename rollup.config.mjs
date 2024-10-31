import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

export default [
  {
    input: {
      index: 'src/index.ts',
      'plugins/stt/azure/index': 'src/plugins/stt/azure/index.ts',
      'plugins/stt/deepgram/index': 'src/plugins/stt/deepgram/index.ts',
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].js',
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].esm.js',
      },
    ],
    plugins: [
      json(),
      del({ targets: 'dist/*' }),
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.stories.ts',
          'examples/**',
        ],
      }),
      copy({
        targets: [
          { src: 'README.md', dest: 'dist' },
          { src: 'package.json', dest: 'dist' },
        ],
      }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
    ],
    onwarn: (warning, next) => {
      if (
        (warning.id && /node_modules/.test(warning.id)) ||
        (warning.ids && warning.ids.every((id) => /node_modules/.test(id)))
      ) {
        return;
      }

      next(warning);
    },
  },
];
