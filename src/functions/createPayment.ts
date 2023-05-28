//Services

//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { I_Payments } from "src/interfaces/I_Payments";


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
let paymentObj: I_Payments;
let item: I_Payments;
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


        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---


        paymentObj =
        {
            "uuid": "SSD8SAJJSDASDASD",
            "items":
            {
                "id": "MLB2907679857",
                "title": "Point Mini",
                "description": "Producto Point para cobros con tarjetas mediante bluetooth",
                "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
                "category_id": "electronics",
                "quantity": 1,
                "unit_price": 58.8
            },
            "payer": {
                "id": "12",
                "first_name": "Test",
                "last_name": "Test",
            },
            "shipments": {
                "receiver_address": {
                    "zip_code": "12312-123",
                    "state_name": "Rio de Janeiro",
                    "city_name": "Buzios",
                    "street_name": "Av das Nacoes Unidas",
                    "street_number": 3003
                }
            },
            "description": "Payment for product",
            "external_reference": "MP0001",
            "payment_method_id": "visa",
            "token": "ff8080814c11e237014c1ff593b57b4d",
            "transaction_amount": 58.8
        };

        // let item = {
        //     'uuid': {
        //         'S': paymentObj.uuid
        //     },
        //     'additiitemsonal_info': {
        //         'S': 'sss'
        //     }
        // };

        item = {
            uuid: paymentObj.uuid,
            items: paymentObj.items,
            payer: paymentObj.payer,
            shipments: paymentObj.shipments,
            description: paymentObj.description,
            external_reference: paymentObj.external_reference,
            payment_method_id: paymentObj.payment_method_id,
            token: paymentObj.token,
            transaction_amount: paymentObj.transaction_amount,
        };

        let newPayment = await insertItems(PAYMENTS_TABLE_NAME, item);

        return await requestResult(statusCode.OK, newPayment);

        //-- end with validation headers and keys ---

        // //-- start with event body --
        // eventBody = await formatToJson(event.body);

        // siteId = await eventBody.site_id;
        // title = await eventBody.title;
        // subtitle = await eventBody.subtitle;
        // sellerId = await eventBody.seller_id;
        // categoryId = await eventBody.category_id;
        // officialStoreId = await eventBody.official_store_id;
        // price = await eventBody.price;
        // basePrice = await eventBody.base_price;
        // originalPrice = await eventBody.original_price;
        // initialQuantity = await eventBody.initial_quantity;
        // availableQuantity = await eventBody.available_quantity;
        // dateNow = await currentDateTime();
        // hasSpecification = await eventBody.has_specification;
        // creationDate = dateNow;
        // updateDate = dateNow;

        // //-- start with event body --

        // //-- start with db PRODUCT operations  ---

        // objProduct = new Product(siteId, title, subtitle, sellerId, categoryId, officialStoreId, price, basePrice, originalPrice, initialQuantity, availableQuantity, hasSpecification, creationDate, updateDate);

        // newProduct = await addProductService(objProduct);

        // //-- end with db PRODUCT operations  ---


        // //-- start with db PRODUCT_SPECIFICATION operations  ---

        // if (hasSpecification
        //   && (newProduct.statusCode == statusCode.OK)
        // ) {

        //   addedProductObject = await getLikeCreatDateAndTitleProdService(title, creationDate);

        //   if (addedProductObject.statusCode != statusCode.OK) {
        //     return addedProductObject;
        //   }
        //   idAddedProductObject = await addedProductObject[0].dataValues.id;

        //   const PRODUCT_SPECIFICATION_ENDPOINT = `http://${process.env.API_HOST}:${process.env.API_PORT}/${process.env.API_STAGE}/${process.env.API_VERSION}/${process.env.API_ENDPOINT_PRODUCTS_SPECIFICATIONS_NAME}/add/${idAddedProductObject}`;


        //   addedProductSpecificationObject = await getAddedProductSpecifAxios(PRODUCT_SPECIFICATION_ENDPOINT, null, HEADERS);

        //   objectsList.push(objProduct);
        //   objectsList.push(addedProductSpecificationObject.data.message);

        //   return await requestResult(statusCode.OK, objectsList);
        // }
        // //-- end with db PRODUCT_SPECIFICATION operations  ---

        // return newProduct;

    } catch (error) {
        msg = `Error in CREATE PAYMENT lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
