import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as createError from 'http-errors';
import commonMiddleware from './middleware/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();
export const getAuctionHandler: any = async (event, _context) => {
  let auctions;

  try {
    const result = await dynamodb
      .scan({
        TableName: 'AuctionsTable'
      })
      .promise();
    auctions = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(auctions)
    };
  } catch (error) {
    new createError.InternalServerError(error);
  }
};

export const getAuctions = commonMiddleware(getAuctionHandler);

export const getSingleAuction: any = async (event, _context) => {
  let auctions;

  try {
    const result = await dynamodb
      .get({
        TableName: 'AuctionsTable',
        Key: { id: event.pathParameters.id }
      })
      .promise();

    auctions = result.Item;

    if (!!auctions) {
      throw new createError.NotFound(
        `No item found for id : ${event.pathParameters.id}`
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify(auctions)
    };
  } catch (error) {
    new createError.InternalServerError(error);
  }
};

export const getAuction = commonMiddleware(getSingleAuction);
