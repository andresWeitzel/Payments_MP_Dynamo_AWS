//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
//Const-vars
let checkEventHeaders:any;
let validateReqParams:boolean;
let validateAuth:boolean;  
  
  /**
   * @description Validates that all the necessary headers are correct, along with the x-api-key and the bearer token
   * @param {Object} inputEventHeaders event.headers type
   * @returns a json object with status code and msj
   * @example  return await requestResult(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization"
      );
   */
  export const validateHeadersAndKeys = async (inputEventHeaders: any) => {

    try {
    //-- start with validation Headers  ---
    checkEventHeaders = null;

    validateReqParams = await validateHeadersParams(await inputEventHeaders);

    if (!validateReqParams) {
        checkEventHeaders = await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check missing or malformed headers"
      );
    }

    validateAuth = await validateAuthHeaders(await inputEventHeaders);

    if (!validateAuth) {
        checkEventHeaders = await requestResult(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization"
      );
    }
    //-- end with validation Headers  ---

    return checkEventHeaders;
  
    } catch (error) {
      console.error(`ERROR in function validateHeadersAndKeys(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }