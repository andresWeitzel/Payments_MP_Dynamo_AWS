//External
const {
    PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description insert one item into the database
* @param {String} tableName string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
export const insertOneItem = async (tableName,item) => {
    try {

        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutItemCommand({
            TableName: tableName,
            Item : item
        }));
        
        if(metadata!=null){
            requestId = metadata.$metadata.requestId;
        }

        return requestId;

    } catch (error) {
        console.error(`ERROR in insertOneItems() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}
