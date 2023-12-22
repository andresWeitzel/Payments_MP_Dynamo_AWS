//External
import { PutCommand } from "@aws-sdk/lib-dynamodb";
//Helpers
import { dynamoDBClient } from "../config/dynamoDBClient";
//Const
const INSERT_ITEM_ERROR = "ERROR in insertItems helper function.";
//Vars
let dynamo: any;
let metadata: any;
let requestId: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description insert one item into the database
 * @param {String} tableName string type
 * @param {Object} items object json type
 * @returns a metadata with the information of the operation
 */
export const insertItems = async (tableName: any, items: any) => {
  try {
    requestId = null;
    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: items,
      })
    );

    if (metadata != null) {
      requestId = metadata.$metadata.requestId;
    }

    return requestId;
  } catch (error) {
    msgResponse = INSERT_ITEM_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
