//External
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
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
 * @param {Object} items object json type
 * @returns a metadata with the information of the operation
 */
export const insertItems = async (tableName,items) => {
    try {

        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutCommand({
            TableName: tableName,
            Item : items
        }));
        
        if(metadata!=null){
            requestId = metadata.$metadata.requestId;
        }

        return requestId;

    } catch (error) {
        console.error(`ERROR in insertItems() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}
