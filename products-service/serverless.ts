import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'products-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'lesson4-instance.cyuu6wtxowkz.eu-west-1.rds.amazonaws.com',
      PG_PORT: 5432,
      PG_DATABASE: 'lesson4',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: 'DC8FETw3exlM9iCxqWOr',
    },
  },
  functions: {
    hello: {
      handler: 'pg-client.invokeHello',
    },
    setDefaultProducts: {
      handler: 'pg-client.invoke',
    },
    getAllProducts: {
      handler: 'pg-client.getAllProductsFromDb',
    },
    getProductByIdFromDb: {
      handler: 'pg-client.getProductByIdFromDb'
    },
    createProductInDb: {
      handler: 'pg-client.createProductInDb'
    },
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products-list',
            cors: true,
          }
        }
      ]
    },
    getProductsById: {
      handler: 'handler.getProductsById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            }
          }
        }
      ]
    },
    createProduct: {
      handler: 'handler.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  title: true,
                  description: true,
                  price: true,
                }
              }
            }
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
