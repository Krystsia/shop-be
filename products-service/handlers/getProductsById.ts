import {APIGatewayProxyHandler} from "aws-lambda";
import 'source-map-support/register';
import {Product} from "./getProductsList";
import productList from "../data/productList.json";

export const getProductsById : APIGatewayProxyHandler = async (event, _context) => {
  console.log('event', event);

  const productId: string = event.pathParameters.productId;
  const product: Product = productList.find(product => product.id === productId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(product),
  };
}
