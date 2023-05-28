/**
 * @description get a json with the http status code, a message and input
 * @param {Number} statusCode Number type
 * @param {Any} message any type
 * @returns a json for the lambda response
 */
export const requestResult = async (statusCode:number, message:any) => {
    try {
        return {
            statusCode: statusCode,
            body: JSON.stringify(
                {
                    message: message,
                },
                null,
                2
            ),
        };
    } catch (error) {
        console.error(`ERROR in function requestResult(). Caused by ${error} . Specific stack is ${error.stack} `);
    }

}