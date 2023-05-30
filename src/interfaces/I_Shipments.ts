//Interfaces
import { I_ReceiverAddress } from "./I_ReceiverAddress";

export interface I_Shipments {
    /**
     * @description Objeto que comprende la dirección del destinatario de la compra.
     */
    receiver_address: I_ReceiverAddress;
}