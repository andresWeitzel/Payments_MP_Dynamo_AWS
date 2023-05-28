//Vars-const
let formatNumber:any;
/**
 * @description Convert to bigint format
 * @param {Object} obj Object type
 * @returns an object json with this format
 */
export const formatToBigint = async (obj: any) => {
    try {
        formatNumber = obj;

        if (typeof formatNumber != 'bigint') {
            //Convert to bigint to save
            formatNumber =  parseInt(formatNumber);
        }
        return formatNumber;
    } catch (error) {
        console.log(`Error in formatToBigint(), caused by ${{ error }}`);
        console.error(error.stack);
    }
}
