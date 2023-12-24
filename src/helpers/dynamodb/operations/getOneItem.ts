//External
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
import { dynamoDBClient } from "../config/dynamoDBClient";
//Const
const GET_ONE_ERROR = "ERROR in getOneItem helper function.";
//Vars
let dynamo: any;
let metadata: any;
let item: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description get one item from the database according the id
 * @param {String} tableName string type
 * @param {Object} key object json type
 * @returns a list with one item from the db in json format
 */
export const getOneItem = async (tableName: string, key: string) => {
  try {
    item = null;
    metadata = null;

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: key,
      })
    );

    if (metadata != null) {
      item = metadata.Item;
    }

    return item;
  } catch (error) {
    msgResponse = GET_ONE_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
