import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  dest: 'transformers.js',
  plugins: [babel({
    babelrc: false,
    presets: ['es2015-rollup'],
  })],
  format: 'cjs',
  external: ['moment'],
}
