//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
//Const
const REQUEST_PARAMS_BAD_REQUEST_MESSAGE =
  "Bad request, check missing or malformed headers";
const AUTH_UNAUTHORIZED_MESSAGE =
  "Not authenticated, check x_api_key and Authorization";
const VALIDATE_HEADER_KEYS_ERROR_MESSAGE =
  "Error in validateHeadersAndKeys helper function";
//codes
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const UNAUTHORIZED_CODE = statusCode.UNAUTHORIZED;
//Vars
let checkEventHeaders: any;
let validateReqParams: boolean;
let validateAuth: boolean;
let msgResponse: string;
let msgLog: string;

/**
   * @description Validates that all the necessary headers are correct, along with the x-api-key and the bearer token
   * @param {Object} inputEventHeaders event.headers type
   * @returns a json object with status code and msj
   * @example  return await requestResult(
        UNAUTHORIZED_CODE,
        AUTH_UNAUTHORIZED_MESSAGE
      );
   */
export const validateHeadersAndKeys = async (inputEventHeaders: any) => {
  try {
    //-- start with validation Headers  ---
    checkEventHeaders = null;

    validateReqParams = await validateHeadersParams(await inputEventHeaders);

    if (!validateReqParams) {
      checkEventHeaders = await requestResult(
        BAD_REQUEST_CODE,
        REQUEST_PARAMS_BAD_REQUEST_MESSAGE
      );
    }

    validateAuth = await validateAuthHeaders(await inputEventHeaders);

    if (!validateAuth) {
      checkEventHeaders = await requestResult(
        UNAUTHORIZED_CODE,
        AUTH_UNAUTHORIZED_MESSAGE
      );
    }
    //-- end with validation Headers  ---

    return checkEventHeaders;
  } catch (error) {
    msgResponse = VALIDATE_HEADER_KEYS_ERROR_MESSAGE;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
