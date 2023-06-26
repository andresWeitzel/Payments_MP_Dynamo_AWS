//External Imports
const { Validator } = require("node-input-validator");
//Const/vars
let validateCheck:any;
let validatorObj:any;
let eventHeadersObj:any;

/**
 * @description We validate the request headers parameters
 * @param {Object} eventHeaders event.headers type
 * @returns a boolean
 * @example Content-Type, Authorization, etc
 */
export const validateHeadersParams = async (eventHeaders:any) => {
  eventHeadersObj = null;
  validatorObj= null;
  validateCheck = false;

  try{
    if(eventHeaders != null){

      eventHeadersObj ={
        headers:{
          contentType: await eventHeaders["Content-Type"],
          authorization: await eventHeaders["Authorization"],
          xApiKey: await eventHeaders["x-api-key"],
        }
      }
      validatorObj = new Validator(
        {
          eventHeadersObj,
        },
        {
          "eventHeadersObj.headers.contentType": "required|string|maxLength:20",
          "eventHeadersObj.headers.authorization": "required|string|minLength:100|maxLength:400",
          "eventHeadersObj.headers.xApiKey": "required|string|minLength:30|maxLength:100",
        }
      );
      validateCheck = await validatorObj.check();
    }

  } catch (error) {
    console.error(`ERROR in function validateHeadersParams(). Caused by ${error} . Specific stack is ${error.stack} `);
  }

  return validateCheck;
}

