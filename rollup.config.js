import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      // file: pkg.main,
      dir: 'dist',
      format: 'cjs',
    },
    {
      // file: pkg.module,
      dir: 'dist',
      format: 'es',
    },
  ],
  external: Object.keys(pkg.devDependencies),
  plugins: [babel()],
}
