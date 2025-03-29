import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default (env) => {
  const config = env.production
    ? require('./webpack.prod.js').default
    : require('./webpack.dev.js').default;

  return config;
};
