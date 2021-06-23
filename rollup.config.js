import resolve from 'rollup-plugin-node-resolve'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import serve from 'rollup-plugin-serve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import clear from 'rollup-plugin-clear'
import babel from 'rollup-plugin-babel'
import jsx from 'rollup-plugin-jsx'

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true,
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules',
  },

  plugins: [
    clear({
      targets: ['dist'],
    }),
    resolve({
      extensions: ['.tsx', '.js', '.ts', '.json', 'jsx'],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.tsx', '.js', '.ts', '.json', 'jsx'],
    }),
    typescript(),
    jsx({ factory: 'createComponent', passUnknownTagsToFactory: true }),
    htmlTemplate({
      template: 'example/demo.html',
      target: 'dist/index.html',
    }),
    json(),
    serve('dist'),
    commonjs(),
    //
  ],
}
