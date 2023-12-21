//External
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
import { dynamoDBClient } from "../config/dynamoDBClient";
//Const
const GET_ALL_ERROR_DETAILS = "ERROR in getAllItems helper function.";
const GET_ALL_WITH_FILTER_ERROR_DETAILS = "ERROR in getAllItemsWithFilter helper function.";
//Vars
let dynamo: any;
let metadata: any;
let items: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description get all payment objects items from the database
 * @param {String} tableName string type
 * @param {BigInt} pageSizeNro BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
export const getAllItems = async (
  tableName: string,
  pageSizeNro: number,
  orderAt: any
) => {
  try {
    items = null;
    metadata = null;
    orderAt = orderAt.toLowerCase();
    msgResponse = null;
    msgLog = null;

    orderAt = orderAt == "asc" || orderAt == null ? true : false;

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
        Limit: pageSizeNro,
        ScanIndexForward: orderAt,
      })
    );

    if (metadata != null) {
      items = metadata.Items;
    }

    return items;
  } catch (error) {
    msgResponse = GET_ALL_ERROR_DETAILS;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;

  }
};

/**
 * @description get all items from the database according to the filter applied
 * @param {String} tableName string type
 * @param {String} filter string type
 * @param {any} filterValue any type
 * @param {number} pageSizeNro number type
 * @param {any} orderAt any type
 * @returns a list with all items from the db in json format
 */
export const getAllItemsWithFilter = async (
  tableName: string,
  filter: any,
  filterValue: any,
  pageSizeNro: number,
  orderAt: any
) => {
  try {
    items = null;
    metadata = null;
    orderAt = orderAt.toLowerCase();
    msgResponse = null;
    msgLog = null;

    orderAt = orderAt == "asc" || orderAt == null ? true : false;

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
        FilterExpression: "contains(#filter, :filterValue)",
        ExpressionAttributeNames: {
          "#filter": filter,
        },
        ExpressionAttributeValues: {
          ":filterValue": filterValue,
        },
        Limit: pageSizeNro,
        ScanIndexForward: orderAt,
      })
    );

    if (metadata != null) {
      items = metadata.Items;
    }

    return items;
  } catch (error) {
    msgResponse = GET_ALL_WITH_FILTER_ERROR_DETAILS;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;


  }
};
