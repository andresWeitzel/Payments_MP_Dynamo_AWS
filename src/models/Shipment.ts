import { ReceiverAddress } from "./ReceiverAddress";

/**
* @description Objeto que comprende toda la información para el envío de la compra del cliente.
*/
export class Shipment extends ReceiverAddress {

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