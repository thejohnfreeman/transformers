import babel from 'rollup-plugin-babel'

export default {
    entry: 'index.js',
    plugins: [babel()],
    format: 'cjs',
    dest: 'transformers.js',
}
