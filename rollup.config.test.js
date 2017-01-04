import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.test.js',
  dest: 'test.js',
  plugins: [babel({
    babelrc: false,
    presets: ['es2015-rollup'],
  })],
  format: 'cjs',
}
