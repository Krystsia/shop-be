import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import productList from '../data/productList.json';

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export const getProductsList : APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(productList),
  };
}


