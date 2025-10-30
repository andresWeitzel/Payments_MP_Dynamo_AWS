//External
const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
import { dynamoDBClient } from "../config/dynamoDBClient";
//Const
const UPDATE_ITEM_ERROR = "ERROR in updateOneItem helper function.";
//Vars
let dynamo: any;
let metadata: any;
let itemUpdated: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description update one item into the database
 * @param {String} tableName string type
 * @param {String} key string type
 * @param {Object} item any object json type
 * @returns a metadata with the information of the operation
 */
export const updateOneItem = async (
  tableName: string,
  key: any,
  item: any
) => {
  try {
    itemUpdated = null;
    const itemKeys = Object.keys(item);
    const keyAttributeNames = Object.keys(key);
    const updatableKeys = itemKeys.filter((k) => !keyAttributeNames.includes(k));

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new UpdateCommand({
        TableName: tableName,
        Key: key,
        ReturnValues: "ALL_NEW",
        UpdateExpression: `SET ${updatableKeys
          .map((k) => `#field_${k} = :value_${k}`)
          .join(", ")}`,
        ExpressionAttributeNames: updatableKeys.reduce(
          (accumulator, k) => ({
            ...accumulator,
            [`#field_${k}`]: k,
          }),
          {}
        ),
        ExpressionAttributeValues: updatableKeys.reduce(
          (accumulator, k) => ({
            ...accumulator,
            [`:value_${k}`]: item[k],
          }),
          {}
        ),
      })
    );

    if (metadata != null) {
      itemUpdated = metadata.Attributes;
    }

    return itemUpdated;
  } catch (error) {
    msgResponse = UPDATE_ITEM_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.error(msgLog);
    console.error('Error details:', {
      tableName,
      key,
      itemKeys: Object.keys(item),
      errorMessage: error.message,
      errorCode: error.code,
      errorStack: error.stack
    });

    return msgResponse;
  }
};
