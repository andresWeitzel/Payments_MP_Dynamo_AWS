//Const
const FORMAT_TO_STRING_ERROR = "ERROR in formatToString helper function.";
//Vars
let msgResponse: string;
let msgLog: string;

/**
 * @description Convert to string format
 * @param {Object} obj Object type
 * @returns an object string with this format
 */
export const formatToString = async (obj: any) => {
  try {
    obj = typeof obj != "string" ? JSON.stringify(obj, null, 2) : obj;

    return obj;
  } catch (error) {
    msgResponse = FORMAT_TO_STRING_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
