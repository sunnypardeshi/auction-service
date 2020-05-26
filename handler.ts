import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
    })
  };
};

export const createAuction: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const { title } = JSON.parse(event.body);

  const auctionDetails = {
    title,
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  return {
    statusCode: 200,
    body: JSON.stringify(auctionDetails)
  };
};
