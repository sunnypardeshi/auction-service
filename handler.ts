import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

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
export const createAuction: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const { title } = JSON.parse(event.body);

  const auctionDetails = {
    id: uuid(),
    title,
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  const result = await dynamodb
    .put({
      TableName: 'AuctionsTable',
      Item: auctionDetails
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
