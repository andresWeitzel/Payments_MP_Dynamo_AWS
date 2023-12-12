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
    console.error(
      `Error in formatToJson(), caused by ${error}. Specific stack is ${error.stack}`
    );
  }
};
