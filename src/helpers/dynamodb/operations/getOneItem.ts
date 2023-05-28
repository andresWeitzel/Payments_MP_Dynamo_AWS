//External
const {
    GetItemCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let item:any;


/**
 * @description get one items from the database according the id
 * @param {String} tableName string type
 * @param {Object} key object json type
 * @returns a list with one item from the db in json format
 */
export const getOneItem = async (tableName, key) => {

    try {
        item = null;
        metadata=null;

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new GetItemCommand({
            TableName: tableName,
            Key: key
        }));
        
        if(metadata != null){
            item = metadata.Item;
        }

        return item;

    } catch (error) {
        console.error(`ERROR in getOneItems() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}

