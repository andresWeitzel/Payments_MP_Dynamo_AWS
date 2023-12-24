//Const
const FORMAT_TO_JSON_ERROR = "ERROR in formatToJson helper function.";
//Vars
let msgResponse: string;
let msgLog: string;

/**
 * @description Convert to json format
 * @param {Object} obj Object type
 * @returns an object json with this format
 */
export const formatToJson = async (obj: any) => {
  try {
    obj = typeof obj != "object" ? await JSON.parse(obj) : obj;

    return obj;
  } catch (error) {
    msgResponse = FORMAT_TO_JSON_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
