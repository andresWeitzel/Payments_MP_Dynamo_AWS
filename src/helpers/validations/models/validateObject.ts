//External
import { validate } from "class-validator";
//Const
const VALIDATE_OBJECT_ERROR_MESSAGE =
  "Error in validateObject helper function";
//Vars
let stackFieldsErrors: any;
let msgResponse: string;
let msgLog: string;

/**
   * @description Validation of all the properties of the object.
   * @param {object} obj any type
   * @returns an array object with the specific errors (constraints) of each class property
   */
export const validateObject = async (obj: any) => {
  stackFieldsErrors = [];

  try {
    await validate(obj).then((errors) => {
      errors.map((e) => {
        for (let key in e.constraints) {
          stackFieldsErrors.push(e.constraints[key]);
        }
      });
    });

    return stackFieldsErrors;
  } catch (error) {
    msgResponse = VALIDATE_OBJECT_ERROR_MESSAGE;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return msgResponse;
  }
};
