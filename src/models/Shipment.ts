//External
import { IsNotEmpty, IsString, Length } from "class-validator";
//Models
import { ReceiverAddress } from "./ReceiverAddress";
//Const-vars
const MIN_VALUE_UUID = 30;
const MAX_VALUE_UUID = 40;

/**
* @description Objeto que comprende toda la información para el envío de la compra del cliente.
*/
export class Shipment extends ReceiverAddress {

    /**
 * @description identificador del envío
 */
    @IsNotEmpty({ message: 'The uuid of the shipment cannot be empty' })
    @IsString({ message: 'The uuid of the shipment must be of type string' })
    @Length(MIN_VALUE_UUID, MAX_VALUE_UUID, { message: `The value of the shipment uuid must be between ${MIN_VALUE_UUID} and ${MAX_VALUE_UUID} characters` })
    private uuid: string;

    constructor($uuid: string, $zipCode: string, $stateName: string, $cityName: string, $streetName: string, $streetNumber: number) {
        super($zipCode, $stateName, $cityName, $streetName, $streetNumber);
        this.uuid = $uuid;

    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

}