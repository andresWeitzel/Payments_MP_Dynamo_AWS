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
    console.error(
        `Error in formatToBigint(), caused by ${error}. Specific stack is ${error.stack}`
      );
  }
};
