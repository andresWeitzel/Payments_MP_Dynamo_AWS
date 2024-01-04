//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { getAllItems } from "src/helpers/dynamodb/operations/getAllItems";
import { formatToBigint } from "src/helpers/format/formatToNumber";
//Const
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;
//Vars
let eventHeaders: any;
let eventQueryStrParams: any;
let checkEventHeadersAndKeys: any;
let msg: string;
let code: number;
let pageSizeNro: number;
let orderAt: string;
let items: any;
let paramPageSizeNro: any;
let paramOrderAt: any;

/**
 * @description Get all paginated payments list object
 * @param {Object} event Object type
 * @returns payments object list
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    pageSizeNro = 5;
    orderAt = "asc";
    items = null;
    msg = null;
    code = null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    eventQueryStrParams = await event.queryStringParameters;

    if (eventQueryStrParams != null) {
      paramPageSizeNro = await formatToBigint(eventQueryStrParams.limit);
      paramOrderAt = eventQueryStrParams.orderAt;
    }

    pageSizeNro =
      paramPageSizeNro != null &&
      paramPageSizeNro != undefined &&
      !isNaN(paramPageSizeNro)
        ? paramPageSizeNro
        : pageSizeNro;
    orderAt =
      paramOrderAt != null &&
      paramOrderAt != undefined &&
      isNaN(paramOrderAt)
        ? paramOrderAt
        : orderAt;

    //-- end with pagination  ---

    //-- start with db operations  ---
    items = await getAllItems(PAYMENTS_TABLE_NAME, pageSizeNro, orderAt);

    if (items == null || !items.length) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not get a paginated payments list. Try again"
      );
    }

    return await requestResult(statusCode.OK, items);
    //-- end with db operations  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in GET ALL PAYMENTS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
