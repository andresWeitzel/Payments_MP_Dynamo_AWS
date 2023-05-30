//External
import {v4 as uuidv4} from 'uuid';

/**
 * @description Generate uuid v4
 * @returns a string
 * @example 8a6e0804-2bd0-4672-b79d-d97027f9071a
 */
export const generateUuidV4 = async () => {
    try {
       return uuidv4();
    } catch (error) {
        console.log(`Error in generateUuidV4(), caused by ${{ error }}`);
        console.error(error.stack);
    }
}