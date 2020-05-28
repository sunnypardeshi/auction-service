// import { APIGatewayProxyHandler } from 'aws-lambda';

import commonMiddleware from './middleware/commonMiddleware';
const iotHandler: any = async (event, _context) => {
  const { data, topicName } = event;
  console.log('incomming data ==> ', data, 'topicName ===>', topicName);
  console.log('whole event ===>', event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'response from iot handler'
      },
      data
    )
  };
};

export const iot = commonMiddleware(iotHandler);
