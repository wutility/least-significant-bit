import { terser } from "rollup-terser";
import typescript from 'rollup-plugin-typescript2';

export default {
  input: "src/index.ts",
  output: [
    {
      name: 'LSBSteganography',
      file: 'build/index.js',
      format: 'umd',
      sourcemap: false
    },
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    terser()
  ]
};