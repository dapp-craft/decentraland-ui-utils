import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import cleaner from 'rollup-plugin-cleaner'

const plugins = [
  cleaner({
    targets: ['./dist'],
  }),
  typescript({
      tsconfig: './tsconfig.json',
    },
  ),
  commonjs({
    ignoreGlobal: true,
    include: [/node_modules/],
  }),
]

export default {
  input: './src/index.ts',
  context: 'globalThis',
  external: ['@dcl/sdk/math', '@dcl/sdk/react-ecs', '@dcl/sdk/ecs'],
  plugins,
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'ui-utils',
      sourcemap: true,
      amd: {
        id: '@dcl/ui-scene-utils',
      },
      globals: {
        '@dcl/sdk/math': '@dcl/sdk/math',
        '@dcl/sdk/react-ecs': '@dcl/sdk/react-ecs',
        '@dcl/sdk/ecs': '@dcl/sdk/ecs'
      },
    },
  ],
}
