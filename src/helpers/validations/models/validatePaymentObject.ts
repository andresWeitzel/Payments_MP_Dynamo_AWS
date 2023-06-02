//External
import {
    validate
  } from 'class-validator';
  //Models 
  
import { Payment } from 'src/models/Payment';
  //Const/vars
  let stackFieldsErrors;
  
  
  /**
   * @description Validation of all the properties of the Payment class.
   * @param {object} objPayment object type
   * @returns an array object with the specific errors (constraints) of each class property
   * @example {
    "message": "Bad request, check request attributes. Validate the following : The items must be of type I_Items (    id: string; title: string; description: string | null;picture_url: string | null; category_id:...)"
}
   */
  export const validatePaymentObject = async (objPayment: Payment) => {
    stackFieldsErrors = [];
  
    try {
  
      await validate(objPayment).then((errors) => {
        errors.map((e) => {
          for (let key in e.constraints) {
            stackFieldsErrors.push(e.constraints[key]);
          }
        })
      });
  
      return stackFieldsErrors;
  
    } catch (error) {
      console.error(`ERROR in function validatePaymentObject(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }