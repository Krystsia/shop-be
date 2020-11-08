import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import productList from '../data/productList.json';
import {getAllProducts} from "../db/get-all-products";

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export const getProductsList : APIGatewayProxyHandler = async () => {

  const products = await getAllProducts();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(products),
  };
}


