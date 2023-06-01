//External
const {
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let items:any;


/**
 * @description get all items from the database
 * @param {String} tableName string type
 * @param {BigInt} pageSizeNro BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
export const getAllItems = async (tableName:string, pageSizeNro:number, orderAt:any) => {
    try {
        items=null;
        metadata=null;
        orderAt = orderAt.toLowerCase();

        if(orderAt=='asc' || orderAt == null){
            orderAt=true;
        }else{
            orderAt=false;
        }

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
                Limit: pageSizeNro,
                ScanIndexForward : orderAt
            })
        );

        if(metadata != null){
            items = metadata.Items;
        }
  
        return items;

    } catch (error) {
        console.error(`ERROR in getAllItems() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}

/**
 * @description get all items from the database according to the filter applied
 * @param {String} tableName string type
 * @param {String} filter String type
 * @param {BigInt} limit BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
export const getAllItemsWithFilter = async (tableName, filter, filterValue,pageSizeNro, orderAt) => {
    try {
        items = null;
        metadata=null;
        orderAt = orderAt.toLowerCase();

        if (orderAt == 'asc' || orderAt == null) {
            orderAt = true;
        } else {
            orderAt = false;
        }

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
                FilterExpression: 'contains(#filter, :filterValue)',
                ExpressionAttributeNames:{
                    "#filter":filter
                },
                ExpressionAttributeValues: {
                    ':filterValue': filterValue
                },
                Limit: pageSizeNro,
                ScanIndexForward: orderAt
            })
        );
        
        if (metadata != null) {
            items = metadata.Items;
        }

        return items;

    } catch (error) {
        console.error(`ERROR in getAllItemsWithFilter() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}
