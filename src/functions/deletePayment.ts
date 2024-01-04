//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToString } from "src/helpers/format/formatToString";
import { deleteItemByUuid } from "src/helpers/dynamodb/operations/deleteItem";
//Const
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;
//Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let paymentUuid: string;
let itemDeleted: any;
let msg: string;
let code: number;

/**
 * @description Delete a payment object from the database
 * @param {Object} event Object type
 * @returns payments object list
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    paymentUuid = null;
    msg = null;
    code = null;
    itemDeleted = null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pathParams operations  ---
    paymentUuid = await formatToString(event.pathParameters.uuid);

    if (paymentUuid == undefined || paymentUuid == null) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        `Bad request, could not delete an inexistent payment. Check the payment uuid with the value ${paymentUuid} and try again`
      );
    }
    //-- end with pathParams operations ---

    //-- start with db operations  ---
    itemDeleted = await deleteItemByUuid(PAYMENTS_TABLE_NAME, paymentUuid);

    if (itemDeleted != true) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        `Unable to delete payment based on uuid ${paymentUuid}`
      );
    }
    return await requestResult(
      statusCode.OK,
      `Successfully removed payment based on uuid ${paymentUuid}`
    );

    //-- end with db operations  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in DELETE PAYMENT lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
