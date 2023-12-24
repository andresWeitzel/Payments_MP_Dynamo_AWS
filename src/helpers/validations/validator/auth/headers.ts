//Environment vars
const X_API_KEY = process.env.X_API_KEY;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
//Const
const VALIDATE_AUTH_HEADERS_ERROR_MESSAGE =
  "Error in validateAuthHeaders helper function";
//Vars
let xApiKey:any;
let authorization:any;
let validate:any;
let msgResponse: string;
let msgLog: string;


/**
 * @description check the x-api-key and the bearer token. In case they are not correct, we return false
 * @param {Object} eventHeaders event.headers type
 * @returns a boolean
 */
export const validateAuthHeaders = async (eventHeaders: any) => {

  try {
    xApiKey = await eventHeaders["x-api-key"];
    authorization = await eventHeaders["Authorization"];
  
    validate = true;
  
    if (
      xApiKey != X_API_KEY ||
      authorization != BEARER_TOKEN ||
      authorization == null
    ) {
      validate = false;
    }
    return validate;
  } catch (error) {
    msgResponse = VALIDATE_AUTH_HEADERS_ERROR_MESSAGE;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }

};
