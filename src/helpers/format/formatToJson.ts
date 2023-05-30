
/**
 * @description Convert to json format
 * @param {Object} obj Object type
 * @returns an object json with this format
 */
export const formatToJson = async (obj: any) => {
    try {
        if (typeof obj != 'object') {
            //Convert to json to save
            obj = await JSON.parse(obj);
        }

        return obj;
    } catch (error) {
        console.log(`Error in formatToJson(), caused by ${{ error }}`);
        console.error(error.stack);
    }
}
