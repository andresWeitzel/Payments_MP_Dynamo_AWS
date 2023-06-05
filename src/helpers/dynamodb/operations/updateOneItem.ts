//External
const {
    UpdateCommand
} = require("@aws-sdk/lib-dynamodb");
// const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let itemUpdated:any;


/**
 * @description update one item into the database
 * @param {String} tableName string type
 * @param {String} key string type
 * @param {Object} item any object json type
 * @returns a metadata with the information of the operation
 */
export const updateOneItem = async (tableName:string, key:string, item:any) => {
    try {
        itemUpdated = null;
        const itemKeys = Object.keys(item);

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new UpdateCommand({
            TableName: tableName,
            Key: key,
            ReturnValues: 'ALL_NEW',
            UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`,
            ExpressionAttributeNames: itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`#field${index}`]: k
            }), {}),
            ExpressionAttributeValues: itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`:value${index}`]: item[k]
            }), {}),
        }));

        if (metadata != null) {
            itemUpdated = metadata.Attributes;
        }

        return itemUpdated;

    } catch (error) {
        console.error(`ERROR in updateOneItem() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}
