import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: 'production',
  devtool: false,
  entry: './src/index.js', // ✅ override entry to your export-only API
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
});
