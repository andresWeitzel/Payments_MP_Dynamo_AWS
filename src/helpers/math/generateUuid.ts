//External
import { v4 as uuidv4 } from "uuid";
//Const
const GENERATE_UUID_ERROR = "ERROR in generateUuidV4 helper function.";
//Vars
let msgResponse: string;
let msgLog: string;

/**
 * @description Generate uuid v4
 * @returns a string
 * @example 8a6e0804-2bd0-4672-b79d-d97027f9071a
 */
export const generateUuidV4 = async () => {
  try {
    return uuidv4();
  } catch (error) {
    msgResponse = GENERATE_UUID_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
