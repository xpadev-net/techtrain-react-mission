import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/main.js',
    output: {
        file: `dist/main.js`,
        format: 'umd',
        name: 'techtrain-react-mission'
    },
    plugins: [
        image(),
        postcss({
            extensions: [".css"],
            modules: true,
        }),
        nodeResolve({
            extensions: [".js"],
        }),
        replace({
            preventAssignment:true,
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
        }),
        babel({
            presets: ["@babel/preset-react"],
        }),
        commonjs(),
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: 3000,
        }),
        livereload({ watch: "dist" }),
    ]
}