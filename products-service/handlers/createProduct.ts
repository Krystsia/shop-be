import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {getAllProductsFromDb} from "../db/getAllProducts";
import {Product} from "../interfaces/Product";
import {ApiError} from "../interfaces/ApiError";
import {createProductInDb} from "../db/createProduct";


export const createProduct : APIGatewayProxyHandler = async (event) => {

  console.log(event, 'eeeeeeeeeeeeeeeeeeee');

  try {
    const { rows }: { rows: Array<Product>} = await createProductInDb(JSON.parse(event.));

    console.log('created product', rows);

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


