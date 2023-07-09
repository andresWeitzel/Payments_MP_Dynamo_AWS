//External
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
//Helpers
import { dynamoDBClient } from "../config/dynamoDBClient";
//Const-vars
let dynamo: any;
let metadata: any;
let checkItemDeleted: any;
/**
 * @description undefined if the object has been deleted, defined if the object does not exist according to the key
 */
let consumedCapacity: any;

/**
 * @description Delete one item object from the database based on their specified table and limit
 * @param {String} tableName String type
 * @param {String} uuid String type
 * @returns a boolean according to the information of the operation
 */
export const deleteItemByUuid = async (tableName: string, uuid: string) => {
  try {
    //Init
    metadata = null;
    checkItemDeleted = false;
    consumedCapacity = null;

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          uuid: uuid,
        },
      })
    );

    consumedCapacity = metadata.ConsumedCapacity;

    if (consumedCapacity == undefined) {
      checkItemDeleted = true;
    }

    return checkItemDeleted;
  } catch (error) {
    console.error(
      `ERROR WITH deleteItemByUuid(), CAUSED BY.. ${error} . Specific stack error is ${error.stack}`
    );
  }
};
