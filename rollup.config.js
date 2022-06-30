import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named',
        }
    ],
    plugins: [
        peerDepsExternal(),
        terser()
    ]
}