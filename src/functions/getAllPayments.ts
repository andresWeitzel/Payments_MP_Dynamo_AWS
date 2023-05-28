//Services

//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { I_Payments } from "src/interfaces/I_Payments";
import { getAllItems } from "src/helpers/dynamodb/operations/getAllItems";
import { formatToBigint } from "src/helpers/format/formatToNumber";


//Const/Vars
// let eventBody: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
// let objProduct: any;
// let siteId: string;
// let title: string;
// let subtitle: string;
// let sellerId: number;
// let categoryId: string;
// let officialStoreId: string;
// let price: number;
// let basePrice: number;
// let originalPrice: number;
// let initialQuantity: number;
// let availableQuantity: number;
// let dateNow: string;
// let hasSpecification: boolean;
// let addedProductObject: any;
// let addedProductSpecificationObject: any;
// let idAddedProductObject: number;
// let objectsList: Array<any>;
// let creationDate: string;
// let updateDate: string;
// let newProduct: any;
let msg: string;
let code: number;
let pageSizeNro: number;
let orderAt: string;
let paymentObj: I_Payments;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;





/**
 * @description Add a payment object according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        // objProduct = null;
        // newProduct = null;
        // addedProductObject = null;
        // objectsList = [];

        pageSizeNro = 5;
        orderAt = 'asc';


        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pagination  ---
        let paramPageSizeNro = await formatToBigint(event.queryStringParameters.limit);
        let paramOrderAt = await event.queryStringParameters.orderAt;

        pageSizeNro =
            (paramPageSizeNro != null &&
                paramPageSizeNro != undefined &&
                !isNaN(paramPageSizeNro))
                ? paramPageSizeNro
                : pageSizeNro;
        orderAt =
            (paramOrderAt != null &&
                paramOrderAt != undefined &&
                isNaN(paramOrderAt))
                ? paramOrderAt
                : orderAt;

        //-- end with pagination  ---

        //-- start with db operations  ---
        let items = await getAllItems(PAYMENTS_TABLE_NAME, pageSizeNro, orderAt);

        return await requestResult(statusCode.OK, items);
        //-- end with db operations  ---

    } catch (error) {
        msg = `Error in GET ALL PAYMENTS lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
