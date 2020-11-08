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
    products: {
      handler: 'pg-client.invoke',
    },
    getAllProducts: {
      handler: 'pg-client.getAllProducts',
    },
    hello: {
      handler: 'pg-client-lambda.invoke',
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
    }
  }
}

module.exports = serverlessConfiguration;
