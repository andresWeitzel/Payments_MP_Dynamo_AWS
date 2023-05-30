//External
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
} from 'class-validator';
//Interfaces
import { I_Items } from "src/interfaces/I_Items";
import { I_Payer } from "src/interfaces/I_Payer";
import { I_Shipments } from "src/interfaces/I_Shipments";
//Vars-const
const MIN_VALUE_UUID = 30;
const MAX_VALUE_UUID = 40;
const MIN_VALUE_DESCRIPTION = 10;
const MAX_VALUE_DESCRIPTION = 300;
const MIN_VALUE_EXTERNAL_REF = 5;
const MAX_VALUE_EXTERNAL_REF = 25;
const MIN_VALUE_PAYM_MET_ID = 4;
const MAX_VALUE_PAYM_MET_ID = 20;
const MIN_VALUE_TOKEN = 30;
const MAX_VALUE_TOKEN = 60;
const MIN_VALUE_TRANSAC_AMOUNT = 30;
const MAX_VALUE_TRANSAC_AMOUNT = 999999999.99;


/**
 * @description Payment class for payment type objects
 */
export class Payments {
    /**
     * @description identificador del pago
     */
    @IsNotEmpty({ message: 'The uuid cannot be empty' })
    @IsString({ message: 'The uuid must be of type string' })
    @Length(MIN_VALUE_UUID, MAX_VALUE_UUID, { message: `The value of the uuid must be between ${MIN_VALUE_UUID} and ${MAX_VALUE_UUID} characters` })
    private uuid: string;

    /**
 * @description Lista de ítems a pagar
 */
    @IsNotEmpty({ message: 'The items cannot be empty' })
    @IsString({ message: 'The items must be of type I_Items' })
    private items: I_Items;

    /**
 * @description El payer es quien realiza el pago. Este campo es un objeto que tiene la información del pagador.
 */
    @IsNotEmpty({ message: 'The payer cannot be empty' })
    @IsString({ message: 'The payer must be of type I_Payer' })
    private payer: I_Payer;

    /**
 * @description Objeto que comprende toda la información para el envío de la compra del cliente.
 */
    @IsNotEmpty({ message: 'The shipments cannot be empty' })
    @IsString({ message: 'The shipments must be of type I_Shipments' })
    private shipments: I_Shipments;

    /**
 * @description Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
 */
    @IsNotEmpty({ message: 'The description cannot be empty' })
    @IsString({ message: 'The description must be of type string' })
    @Length(MIN_VALUE_DESCRIPTION, MAX_VALUE_DESCRIPTION, { message: `The value of the description must be between ${MIN_VALUE_DESCRIPTION} and ${MAX_VALUE_DESCRIPTION} characters` })
    private description: string;

    /**
 * @description Es una referencia de pago externa. Podría ser, por ejemplo, un hashcode del Banco Central, funcionando como identificador del origen de la transacción.
 */
    @IsNotEmpty({ message: 'The externalReference cannot be empty' })
    @IsString({ message: 'The externalReference must be of type string' })
    @Length(MIN_VALUE_EXTERNAL_REF, MAX_VALUE_EXTERNAL_REF, { message: `The value of the externalReference must be between ${MIN_VALUE_EXTERNAL_REF} and ${MAX_VALUE_EXTERNAL_REF} characters` })
    private externalReference: string;

    /**
 * @description Identificador del medio de pago. Indica el ID del medio de pago seleccionado para realizar el pago.
 */
    @IsNotEmpty({ message: 'The paymentMethodId cannot be empty' })
    @IsString({ message: 'The paymentMethodId must be of type string' })
    @Length(MIN_VALUE_PAYM_MET_ID, MAX_VALUE_PAYM_MET_ID, { message: `The value of the paymentMethodId must be between ${MIN_VALUE_PAYM_MET_ID} and ${MAX_VALUE_PAYM_MET_ID} characters` })
    private paymentMethodId: string;

    /**
 * @description Identificador del token card. (obligatorio para tarjeta de crédito). El token de la tarjeta se crea a partir de la información de la propia tarjeta, aumentando la seguridad durante el flujo de pago.
 */
    @IsNotEmpty({ message: 'The token cannot be empty' })
    @IsString({ message: 'The token must be of type string' })
    @Length(MIN_VALUE_TOKEN, MAX_VALUE_TOKEN, { message: `The value of the token must be between ${MIN_VALUE_TOKEN} and ${MAX_VALUE_TOKEN} characters` })
    private token: string;

    /**
 * @description Costo del producto. Ejemplo - La venta de un producto por R$ 100,00 tendrá un transactionAmount = 100.
 */
    @IsNotEmpty({ message: 'The transactionAmount cannot be empty' })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: 'The transactionAmount must be of type number (decimal) and contain only two decimal places after the separator' })
    @Min(MIN_VALUE_TRANSAC_AMOUNT, { message: `The transactionAmount value must be greater than ${MIN_VALUE_TRANSAC_AMOUNT}` })
    @Max(MAX_VALUE_TRANSAC_AMOUNT, { message: `The transactionAmount value must be less than ${MAX_VALUE_TRANSAC_AMOUNT}` })
    private transactionAmount: number;


    constructor(
        uuid: string,
        items: I_Items,
        payer: I_Payer,
        shipments: I_Shipments,
        description: string,
        externalReference: string,
        paymentMethodId: string,
        token: string,
        transactionAmount: number
    ) {
        this.uuid = uuid
        this.items = items
        this.payer = payer
        this.shipments = shipments
        this.description = description
        this.externalReference = externalReference
        this.paymentMethodId = paymentMethodId
        this.token = token
        this.transactionAmount = transactionAmount
    }

    /**
     * Getter $uuid
     * @return {string}
     */
    public get $uuid(): string {
        return this.uuid;
    }

    /**
     * Getter $items
     * @return {I_Items}
     */
    public get $items(): I_Items {
        return this.items;
    }

    /**
     * Getter $payer
     * @return {I_Payer}
     */
    public get $payer(): I_Payer {
        return this.payer;
    }

    /**
     * Getter $shipments
     * @return {I_Shipments}
     */
    public get $shipments(): I_Shipments {
        return this.shipments;
    }

    /**
     * Getter $description
     * @return {string}
     */
    public get $description(): string {
        return this.description;
    }

    /**
     * Getter $externalReference
     * @return {string}
     */
    public get $externalReference(): string {
        return this.externalReference;
    }

    /**
     * Getter $paymentMethodId
     * @return {string}
     */
    public get $paymentMethodId(): string {
        return this.paymentMethodId;
    }

    /**
     * Getter $token
     * @return {string}
     */
    public get $token(): string {
        return this.token;
    }

    /**
     * 
     * Getter $transactionAmount
     * @return {number}
     */

    public get $transactionAmount(): number {

        return this.transactionAmount;
    }

    /**
     * Setter $uuid
     * @param {string} value
     */
    public set $uuid(value: string) {
        this.uuid = value;
    }

    /**
     * Setter $items
     * @param {I_Items} value
     */
    public set $items(value: I_Items) {
        this.items = value;
    }

    /**
     * Setter $payer
     * @param {I_Payer} value
     */
    public set $payer(value: I_Payer) {
        this.payer = value;
    }

    /**
     * Setter $shipments
     * @param {I_Shipments} value
     */
    public set $shipments(value: I_Shipments) {
        this.shipments = value;
    }

    /**
     * Setter $description
     * @param {string} value
     */
    public set $description(value: string) {
        this.description = value;
    }

    /**
     * Setter $externalReference
     * @param {string} value
     */
    public set $externalReference(value: string) {
        this.externalReference = value;
    }

    /**
     * Setter $paymentMethodId
     * @param {string} value
     */
    public set $paymentMethodId(value: string) {
        this.paymentMethodId = value;
    }

    /**
     * Setter $token
     * @param {string} value
     */
    public set $token(value: string) {
        this.token = value;
    }

    /**
     * 
     * Setter $transactionAmount
     * @param {number} value
     */

    public set $transactionAmount(value: number) {

        this.transactionAmount = value;
    }




}