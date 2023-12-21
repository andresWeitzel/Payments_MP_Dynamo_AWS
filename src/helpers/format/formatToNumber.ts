//Const
const FORMAT_TO_BIGINT_ERROR = "ERROR in formatToBigint helper function.";
//Vars
let msgResponse: string;
let msgLog: string;

/**
 * @description Convert to bigint format
 * @param {Object} obj Object type
 * @returns an object json with this format
 */
export const formatToBigint = async (obj: any) => {
  try {
    obj = typeof obj != "bigint" ? parseInt(obj) : obj;

    return obj;
  } catch (error) {
    msgResponse = FORMAT_TO_BIGINT_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
