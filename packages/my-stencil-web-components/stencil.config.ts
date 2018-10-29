import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'my-stencil-web-components',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
