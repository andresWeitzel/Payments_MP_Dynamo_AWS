//Models
import { Payment } from "src/models/Payment";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Services
import { I_Items } from "src/interfaces/I_Items";
import { I_Payer } from "src/interfaces/I_Payer";
import { I_Shipments } from "src/interfaces/I_Shipments";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { formatToJson } from "src/helpers/format/formatToJson";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validatePaymentObject } from "src/helpers/validations/models/validatePaymentObject";
import { Payer } from "src/models/Payer";

//Const/Vars
let eventBody: any;
let eventBodyItems:any;
let eventBodyPayer:any;
let eventBodyShipments:any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let uuid: string;
let items: I_Items;
let newPayer: Payer;
let shipments: I_Shipments;
let description: string;
let externalReference: string;
let paymentMethodId: string;
let transactionAmount: number;
let newPayment: Payment;
let item: any;
let newPaymentItem: any;
let token: string;
let validateObject: any;
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
        item = null;
        newPaymentItem = null;


        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---



        //-- start with event body --
        eventBody = await formatToJson(event.body);
        eventBodyItems = await eventBody.items;
        eventBodyPayer = await eventBody.payer;
        eventBodyShipments = await eventBody.shipments;

        uuid = await generateUuidV4();
        items = { 
            id: eventBodyItems.id, 
            title: eventBodyItems.title,
            description : eventBodyItems.description,
            picture_url: eventBodyItems.picture_url,
            category_id: eventBodyItems.category_id,
            quantity : eventBodyItems.quantity,
            unit_price : eventBodyItems.unit_price
         };
         newPayer = new Payer(eventBodyPayer.id, eventBodyPayer.first_name, eventBodyPayer.last_name);
        shipments = {
            receiver_address : eventBodyShipments.receiver_address
        };
        description = await eventBody.description;
        externalReference = await eventBody.external_reference;
        paymentMethodId = await eventBody.payment_method_id;
        token = await eventBody.token;
        transactionAmount = await eventBody.transaction_amount;
        //-- end with event body --

        //-- start with validation object  ---

 
        newPayment = new Payment(uuid, items
            , newPayer.getId()
            , newPayer.getFirstName()
            , newPayer.getLastName()
            , shipments, description, externalReference, paymentMethodId, token, transactionAmount);

        validateObject = await validatePaymentObject(newPayment);

        if (validateObject.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, check request attributes. Validate the following : ${validateObject}`
            );
        }
        //-- end with validation object  ---


        //-- start with db Payments operations  ---
        item = {
            uuid: newPayment.$uuid,
            description: newPayment.$description,
            externalReference: newPayment.$externalReference,
            paymentMethodId: newPayment.$paymentMethodId,
            token: newPayment.$token,
            transactionAmount: newPayment.$transactionAmount,
            //Since it is not defined in the table, the following fields are added at the end
            items: newPayment.$items,
            payer: {
                id : newPayer.getId(),
                first_name: newPayer.getFirstName(),
                last_name : newPayer.getLastName()
            },
            shipments: newPayment.$shipments,
        }

        newPaymentItem = await insertItems(PAYMENTS_TABLE_NAME, item);

        if (newPaymentItem == null || !(newPaymentItem.length)) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the object has not been inserted into the database"
            );
        }

        return await requestResult(statusCode.OK, newPaymentItem);

        //-- end with db Payments operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in CREATE PAYMENT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
