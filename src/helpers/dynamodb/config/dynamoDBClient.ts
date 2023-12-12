//External
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
//Const
const ERROR_DETAILS = "ERROR in add-dynamoDBClient helper function.";
//Vars
let client: any;
let dynamo: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description creating a dynamodb client
 * @returns a dynamodb client
 */
export const dynamoDBClient = async () => {
  try {
    client = new DynamoDBClient({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_RANDOM_VALUE,
      secretAccessKey: process.env.SECRET_KEY_RANDOM_VALUE,
      endpoint: process.env.DYNAMO_ENDPOINT,
    });

    dynamo = DynamoDBDocumentClient.from(client);

    return dynamo;
  } catch (error) {
    msgResponse = ADD_USER_ERROR_DETAILS;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
