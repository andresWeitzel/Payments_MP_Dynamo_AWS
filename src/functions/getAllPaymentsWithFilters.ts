//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { getAllItemsWithFilter } from "src/helpers/dynamodb/operations/getAllItems";
import { formatToBigint } from "src/helpers/format/formatToNumber";

//Const/Vars
// let eventBody: any;
let eventHeaders: any;
let eventQueryStrParams: any;
let checkEventHeadersAndKeys: any;
let msg: string;
let code: number;
let pageSizeNro: number;
let orderAt: string;
let filter: string;
let filterValue: string;
let paramPageSizeNro: any;
let paramOrderAt: any;
let paramFilter: any;
let paramFilterValue: any;
let items:any;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;

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

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
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
      paramFilter != value.IS_NULL &&
      paramFilter != value.IS_UNDEFINED &&
      isNaN(paramFilter)
        ? paramFilter
        : filter;
    filterValue =
      paramFilterValue != value.IS_NULL &&
      paramFilterValue != value.IS_UNDEFINED &&
      isNaN(paramFilterValue)
        ? paramFilterValue
        : filterValue;
    pageSizeNro =
      paramPageSizeNro != value.IS_NULL &&
      paramPageSizeNro != value.IS_UNDEFINED &&
      !isNaN(paramPageSizeNro)
        ? paramPageSizeNro
        : pageSizeNro;
    orderAt =
      paramOrderAt != value.IS_NULL &&
      paramOrderAt != value.IS_UNDEFINED &&
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

    if (items == value.IS_NULL || !items.length) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not get a paginated payments list. Try again"
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
