import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.test.js',
  dest: 'test.js',
  plugins: [babel({
    babelrc: false,
    plugins: [
      'babel-plugin-transform-es2015-computed-properties',
      'babel-plugin-transform-object-rest-spread',
    ],
    presets: ['es2015-rollup'],
  })],
  format: 'cjs',
  external: ['jsverify', 'jsverify-contrib/set', 'should', '.'],
}
