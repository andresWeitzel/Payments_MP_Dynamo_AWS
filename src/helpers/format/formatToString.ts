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
    console.error(
      `Error in formatToString(), caused by ${error}. Specific stack is ${error.stack}`
    );
  }
};
