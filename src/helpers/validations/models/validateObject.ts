//External
import {
    validate
  } from 'class-validator';
  //Const/vars
  let stackFieldsErrors:any;
  
  
  /**
   * @description Validation of all the properties of the object.
   * @param {object} obj any type
   * @returns an array object with the specific errors (constraints) of each class property
   * @example {
   
}
   */
  export const validateObject = async (obj: any) => {
    stackFieldsErrors = [];
  
    try {
  
      await validate(obj).then((errors) => {
        errors.map((e) => {
          for (let key in e.constraints) {
            stackFieldsErrors.push(e.constraints[key]);
          }
        })
      });
  
      return stackFieldsErrors;
  
    } catch (error) {
      console.error(`ERROR in function validateObject(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }