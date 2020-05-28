import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import * as createError from 'http-errors';
import commonMiddleware from './middleware/commonMiddleware';
export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
    })
  };
};

const dynamodb = new AWS.DynamoDB.DocumentClient();
export const createAuctionHandler: any = async (event, _context) => {
  const { title } = event.body;

  const auctionDetails = {
    id: uuid(),
    title,
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  try {
    await dynamodb
      .put({
        TableName: 'AuctionsTable',
        Item: auctionDetails
      })
      .promise();
  } catch (error) {
    console.log(error.message);
    throw new createError[401](error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(auctionDetails)
  };
};

export const createAuction = commonMiddleware(createAuctionHandler);
