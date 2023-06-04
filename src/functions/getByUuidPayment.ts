//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { getOneItem } from "src/helpers/dynamodb/operations/getOneItem";
import { formatToString } from "src/helpers/format/formatToString";

//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let paymentObj:any;
let key:any;
let msg: string;
let code: number;
let paymentUuid: string;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;



/**
 * @description Get a payment object by uuuid
 * @param {Object} event Object type
 * @returns a payment object
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        paymentObj = value.IS_NULL;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pathParams operations  ---
        paymentUuid = await formatToString(event.pathParameters.uuid);

        if (paymentUuid == value.IS_UNDEFINED || paymentUuid == value.IS_NULL) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, could not get an inexistent payment. Check the payment uuid and try again"
            );
        }
        //-- end with pathParams operations ---


        //-- start with db operations  ---

        key = {'uuid' :paymentUuid};
        paymentObj = await getOneItem(PAYMENTS_TABLE_NAME, key);

        if (paymentObj == value.IS_NULL ||  paymentObj == value.IS_UNDEFINED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not get a payment by uuid. Check if the payment exists in the database and try again"
            );
        }
        //-- end with db operations  ---
        return await requestResult(statusCode.OK, paymentObj);

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in GET PAYMENT BY UUID lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
