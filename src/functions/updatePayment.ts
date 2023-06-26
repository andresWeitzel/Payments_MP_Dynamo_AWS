//Models
import { PaymentDetail } from "src/models/PaymentDetail";
import { Payer } from "src/models/Payer";
import { Item } from "src/models/Item";
import { Shipment } from "src/models/Shipment";
//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToJson } from "src/helpers/format/formatToJson";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validateObject } from "src/helpers/validations/models/validateObject";
import { formatToBigint } from "src/helpers/format/formatToNumber";
import { getOneItem } from "src/helpers/dynamodb/operations/getOneItem";
import { updateOneItem } from "src/helpers/dynamodb/operations/updateOneItem";


//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let key:any;
let eventBody: any;
let eventBodyItems: any;
let eventBodyPayer:any;
let eventBodyShipment: any;
let newItem : Item;
let newPayer : Payer;
let newPayment: PaymentDetail;
let validateItemObj:any;
let validatePayerObj:any;
let validateShipmentObj:any;
let validatePaymentObj:any;
let oldPaymentObj: PaymentDetail;
let newPaymentObj: any;
let newShipment: Shipment;
let itemDynamoDB:any;
let paymentUuid: string;
let msg: string;
let code: number;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;




/**
 * @description Edit a payment object according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the updated object
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        newPaymentObj = value.IS_NULL;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pathParams operations  ---
        paymentUuid = await event.pathParameters.uuid;

        if (paymentUuid == value.IS_UNDEFINED || paymentUuid == value.IS_NULL) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, could not update an inexistent payment. Check the payment uuid and try again"
            );
        }
        //-- end with pathParams operations ---

        //-- start with old object operations  ---

        key = { 'uuid': paymentUuid };

        oldPaymentObj = await getOneItem(PAYMENTS_TABLE_NAME, key);

        if (oldPaymentObj == value.IS_NULL || oldPaymentObj == value.IS_UNDEFINED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, unable to update object in db as failed to get a payment by uuid. Check if the payment exists in the database and try again"
            );
        }
        //-- end with old object operations  ---

        


        //-- start with item object operations --

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
                `Bad request, unable to update object in db,  check request attributes for Item Object . Validate the following : ${validateItemObj}`
            );
        }
        //-- end with item object operations --


        //-- start with payer object operations --

        eventBodyPayer = await eventBody.payer;

        newPayer = new Payer(eventBodyPayer.id
            , eventBodyPayer.first_name
            , eventBodyPayer.last_name);

        validatePayerObj = await validateObject(newPayer);

        if (validatePayerObj.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, unable to update object in db, check request attributes for Payer Object . Validate the following : ${validatePayerObj}`
            );
        }

        //-- end with payer object operations --


        //-- start with shipment object operations --

        eventBodyShipment = await eventBody.shipments.receiver_address;


        newShipment = new Shipment(
            await generateUuidV4()
            , eventBodyShipment.zip_code
            , eventBodyShipment.city_name
            , eventBodyShipment.state_name
            , eventBodyShipment.street_name
            , await formatToBigint(eventBodyShipment.street_number)
        );

        
        validateShipmentObj = await validateObject(newShipment);

        if (validateShipmentObj.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, unable to update object in db, check request attributes for Shipment Object . Validate the following : ${validateShipmentObj}`
            );
        }

        //-- end with shipment object operations --


        //-- start with payment object operations --

        newPayment = new PaymentDetail(
            await generateUuidV4()
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
                `Bad request, unable to update object in db, check request attributes for Payment Object. Validate the following : ${validatePaymentObj}`
            );
        }
        //-- end with payment object operations --

        //-- start with db operations  ---

        itemDynamoDB = {
            description: newPayment.getDescription(),
            externalReference: newPayment.getExternalReference(),
            paymentMethodId: newPayment.getPaymentMethodId(),
            token: newPayment.getToken(),
            transactionAmount: newPayment.getTransactionAmount(),
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
            shipments: {
                receiver_address:{
                    street_number: newShipment.getStreetNumber(),
                    city_name: newShipment.getCityName(),
                    state_name: newShipment.getStateName(),
                    zip_code: newShipment.getZipCode(),
                    street_name: newShipment.getStateName()
                }
            },
        }

        newPaymentObj = await updateOneItem(PAYMENTS_TABLE_NAME, key, itemDynamoDB);

        
        if (newPaymentObj == value.IS_NULL || newPaymentObj == value.IS_UNDEFINED || !(newPaymentObj.length)) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the payment object has not been updated into the database"
            );
        }

        return await requestResult(statusCode.OK, newPaymentObj);

        //-- end with db operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in UPDATE PAYMENT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
