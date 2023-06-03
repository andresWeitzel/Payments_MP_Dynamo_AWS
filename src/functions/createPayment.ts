//Models
import { Payment } from "src/models/Payment";
import { Payer } from "src/models/Payer";
import { Item } from "src/models/Item";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { formatToJson } from "src/helpers/format/formatToJson";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validateObject } from "src/helpers/validations/models/validateObject";
import { I_Shipments } from "src/interfaces/I_Shipments";


//Const/Vars
let eventBody: any;
let eventBodyItems: any;
let eventBodyPayer: any;
let eventBodyShipments: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let uuid: string;
let newItem: Item;
let newPayer: Payer;
let shipments: I_Shipments;
let description: string;
let externalReference: string;
let paymentMethodId: string;
let transactionAmount: number;
let newPayment: Payment;
let itemDynamoDB: any;
let newPaymentItem: any;
let token: string;
let validatePaymentObj: any;
let validateItemObj: any;
let validatePayerObj:any;
let msg: string;
let code: number;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;




/**
 * @description Add a payment object according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        newPayment = null;
        newPaymentItem = null;


        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---



        //-- start with object operations --

        eventBody = await formatToJson(event.body);
    

        eventBodyItems = await eventBody.items;

        newItem = new Item(eventBodyItems.id
            , eventBodyItems.title
            , eventBodyItems.description
            , eventBodyItems.picture_url
            , eventBodyItems.category_id
            , eventBodyItems.quantity
            , eventBodyItems.unit_price);

        validateItemObj = await validateObject(newItem);

        if (validateItemObj.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, check request attributes for Item Object . Validate the following : ${validateItemObj}`
            );
        }

        eventBodyPayer = await eventBody.payer;

        newPayer = new Payer(eventBodyPayer.id
            , eventBodyPayer.first_name
            , eventBodyPayer.last_name);

        validatePayerObj = await validateObject(newPayer);

        if (validatePayerObj.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, check request attributes for Payer Object . Validate the following : ${validatePayerObj}`
            );
        }

        eventBodyShipments = await eventBody.shipments;

        shipments = {
            receiver_address: eventBodyShipments.receiver_address
        };
    
        newPayment = new Payment(
        await generateUuidV4()
        , shipments
        , eventBody.description
        , eventBody.external_reference
        , eventBody.payment_method_id
        , eventBody.token
        , eventBody.transaction_amount
        );

        validatePaymentObj = await validateObject(newPayment);

        if (validatePaymentObj.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, check request attributes for Payment Object. Validate the following : ${validatePaymentObj}`
            );
        }
         //-- end with object operations --



        //-- start with db operations  ---
        itemDynamoDB = {
            uuid: newPayment.getUuid(),
            description: newPayment.$description,
            externalReference: newPayment.$externalReference,
            paymentMethodId: newPayment.$paymentMethodId,
            token: newPayment.$token,
            transactionAmount: newPayment.$transactionAmount,
            //Since it is not defined in the table, the following fields are added at the end
            items: {
                id: newItem.getId(),
                title: newItem.getTitle(),
                description: newItem.getDescription(),
                picture_url: newItem.getPictureUrl(),
                category_id: newItem.getCategoryId(),
                quantity: newItem.getQuantity(),
                unit_price: newItem.getUnitPrice()
            },
            payer: {
                id: newPayer.getId(),
                first_name: newPayer.getFirstName(),
                last_name: newPayer.getLastName()
            },
            shipments: newPayment.$shipments,
        }

        newPaymentItem = await insertItems(PAYMENTS_TABLE_NAME, itemDynamoDB);

        if (newPaymentItem == null || !(newPaymentItem.length)) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the object has not been inserted into the database"
            );
        }

        return await requestResult(statusCode.OK, newPaymentItem);

        //-- end with db operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in CREATE PAYMENT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
