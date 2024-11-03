import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import sass from 'sass';
import { createRequire } from "module";
const pkg = createRequire(import.meta.url)("./package.json");

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
                    implementation: sass,
                    silenceDeprecations: ["legacy-js-api"],
                    includePaths: ['./src/resources/scss']
                }]
            ],
            inject: true,
            minimize: true,
            sourceMap: true,
        }),

    ],
};