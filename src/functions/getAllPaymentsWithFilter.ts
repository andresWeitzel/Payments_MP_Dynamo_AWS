//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { getAllItems } from "src/helpers/dynamodb/operations/getAllItems";
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
        orderAt = 'asc';


        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;
    

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pagination  ---
        eventQueryStrParams = await event.queryStringParameters;

        let paramPageSizeNro = await formatToBigint(eventQueryStrParams.limit);
        let paramOrderAt = eventQueryStrParams.orderAt;

        pageSizeNro =
            (paramPageSizeNro != value.IS_NULL &&
                paramPageSizeNro != value.IS_UNDEFINED &&
                !isNaN(paramPageSizeNro))
                ? paramPageSizeNro
                : pageSizeNro;
        orderAt =
            (paramOrderAt != value.IS_NULL &&
                paramOrderAt != value.IS_UNDEFINED &&
                isNaN(paramOrderAt))
                ? paramOrderAt
                : orderAt;

        //-- end with pagination  ---


        //-- start with db operations  ---
        let items = await getAllItems(PAYMENTS_TABLE_NAME, pageSizeNro, orderAt);

        if (items == value.IS_NULL || !(items.length)) {
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
