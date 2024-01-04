//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { getAllItemsWithFilter } from "src/helpers/dynamodb/operations/getAllItems";
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
let filter: string;
let filterValue: any;
let paramPageSizeNro: any;
let paramOrderAt: any;
let paramFilter: any;
let paramFilterValue: any;
let items: any;

/**
 * @description Get all paginated payments list object with filters
 * @param {Object} event Object type
 * @returns payments object list
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    pageSizeNro = 5;
    orderAt = "asc";
    filter = "uuid";
    filterValue = "A";
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

    //-- start with query string params  ---
    eventQueryStrParams = await event.queryStringParameters;

    if (eventQueryStrParams != null) {
      paramPageSizeNro = await formatToBigint(eventQueryStrParams.limit);
      paramOrderAt = eventQueryStrParams.orderAt;
      paramFilter = eventQueryStrParams.filter;
      paramFilterValue = eventQueryStrParams.filterValue;
    }

    filter =
      paramFilter != null &&
      paramFilter != undefined &&
      isNaN(paramFilter)
        ? paramFilter
        : filter;
    filterValue =
      paramFilterValue != null &&
      paramFilterValue != undefined &&
      isNaN(paramFilterValue)
        ? paramFilterValue
        : filterValue;
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

    //-- end with query string params   ---

    //-- start with db operations  ---
    items = await getAllItemsWithFilter(
      PAYMENTS_TABLE_NAME,
      filter,
      filterValue,
      pageSizeNro,
      orderAt
    );

    if (items == null || !items.length) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not get a paginated payments list with filters. Try again"
      );
    }

    return await requestResult(statusCode.OK, items);
    //-- end with db operations  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in GET ALL PAYMENTS WITH FILTERS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
