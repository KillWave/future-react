import resolve from 'rollup-plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve'
import json from '@rollup/plugin-json'
// import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs'
// import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import babel from 'rollup-plugin-babel';
import jsx from 'rollup-plugin-jsx'
// const extensions = ['.js', '.ts', 'tsx'];
export default {
    input: 'src/main.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: true,
    },
    watch: {
        include: "src/**",
        exclude: "node_modules"
    },
    plugins: [
        resolve({
            extensions: ['.tsx', '.js', '.ts', '.json'],
        }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.tsx', '.js', '.ts', '.json'],
        }),

        jsx({ factory: 'React.component' }),
        // typescript(),
        // getBabelOutputPlugin({
        //     plugins: ["@babel/plugin-external-helpers"]
        // }),

        htmlTemplate({
            template: 'example/demo.html',
            target: 'dist/index.html',
        }),

        json(),
        serve('dist'),
        commonjs(),
        // 
    ]
}

