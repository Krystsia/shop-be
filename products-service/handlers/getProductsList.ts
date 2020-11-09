import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {getAllProductsFromDb} from "../db/getAllProducts";
import {Product} from "../interfaces/Product";
import {ApiError} from "../interfaces/ApiError";


export const getProductsList : APIGatewayProxyHandler = async () => {

  try {
    const { rows }: { rows: Array<Product>} = await getAllProductsFromDb();

    console.log('all products', rows);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(rows),
    };
  } catch (err) {

    const apiError: ApiError = {
      status: 500,
      name: err.name,
      message: err.message,
    }

    return {
      statusCode: 500,
      body: JSON.stringify(apiError),
    }
  }
}


