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
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { formatToJson } from "src/helpers/format/formatToJson";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validateObject } from "src/helpers/validations/models/validateObject";
import { formatToBigint } from "src/helpers/format/formatToNumber";


//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let eventBody: any;
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

        //-- start with db operations  ---

        //-- end with db operations  ---



    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in UPDATE PAYMENT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
