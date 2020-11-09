import {APIGatewayProxyHandler} from "aws-lambda";
import 'source-map-support/register';
import {getProductByIdFromDb} from "../db/getProductById";
import {ApiError} from "../interfaces/ApiError";

export const getProductsById : APIGatewayProxyHandler = async (event, _context) => {

  try {
    const { rows: product } = await getProductByIdFromDb(event.pathParameters.productId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(product),
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
