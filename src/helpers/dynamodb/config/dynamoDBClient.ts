//External
const {
    DynamoDBDocumentClient
} = require("@aws-sdk/lib-dynamodb");
const {
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");
//Const-vars 
let client:any;
let dynamo:any;


/**
 * @description creating a dynamodb client
 * @returns the client created
 */
export const dynamoDBClient = async () => {
    try {
         client = new DynamoDBClient({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_RANDOM_VALUE,
            secretAccessKey: process.env.SECRET_KEY_RANDOM_VALUE,
            endpoint: process.env.DYNAMO_ENDPOINT
        });

        dynamo = DynamoDBDocumentClient.from(client);

        return dynamo;

    } catch (error) {
        console.error(`ERROR in dynamoDBClient() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}

