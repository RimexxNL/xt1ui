import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        postcss({
            extensions: ['.scss'],
            use: [
                ['sass', {
                    includePaths: ['./src/resources/css']
                }]
            ],
            inject: true,
            // extract: true, // Extracts CSS into a separate file
            minimize: true, // Minifies the CSS
            sourceMap: true,
        }),

    ],
};