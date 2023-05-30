//External
import {
    IsBoolean,
    IsInt,
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

export class Payments {
    //Fields
    @IsNotEmpty({ message: 'The uuid cannot be empty' })
    @IsString({ message: 'The uuid must be of type string' })
    @Length(MIN_VALUE_UUID, MAX_VALUE_UUID, { message: `The value of the uuid must be between ${MIN_VALUE_UUID} and ${MAX_VALUE_UUID} characters` })
    private uuid: string;

    @IsNotEmpty({message: 'The items cannot be empty'})
    @IsString({ message: 'The items must be of type I_Items' })
    private items: I_Items;

    @IsNotEmpty({message: 'The payer cannot be empty'})
    @IsString({ message: 'The payer must be of type I_Payer' })
    private payer: I_Payer;

    @IsNotEmpty({message: 'The shipments cannot be empty'})
    @IsString({ message: 'The shipments must be of type I_Shipments' })
    private shipments: I_Shipments;

    @IsNotEmpty({ message: 'The description cannot be empty' })
    @IsString({ message: 'The description must be of type string' })
    @Length(MIN_VALUE_DESCRIPTION, MAX_VALUE_DESCRIPTION, { message: `The value of the description must be between ${MIN_VALUE_DESCRIPTION} and ${MAX_VALUE_DESCRIPTION} characters` })
    private description: string;

    private external_reference: string;
    private payment_method_id: string;
    private token: string;
    private transaction_amount: number;


    constructor(
        uuid: string,
        items: I_Items,
        payer: I_Payer,
        shipments: I_Shipments,
        description: string,
        external_reference: string,
        payment_method_id: string,
        token: string,
        transaction_amount: number
    ) {
        this.uuid = uuid
        this.items = items
        this.payer = payer
        this.shipments = shipments
        this.description = description
        this.external_reference = external_reference
        this.payment_method_id = payment_method_id
        this.token = token
        this.transaction_amount = transaction_amount
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
     * Getter $external_reference
     * @return {string}
     */
    public get $external_reference(): string {
        return this.external_reference;
    }

    /**
     * Getter $payment_method_id
     * @return {string}
     */
    public get $payment_method_id(): string {
        return this.payment_method_id;
    }

    /**
     * Getter $token
     * @return {string}
     */
    public get $token(): string {
        return this.token;
    }

    /**
     * Getter $transaction_amount
     * @return {number}
     */
    public get $transaction_amount(): number {
        return this.transaction_amount;
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
     * Setter $external_reference
     * @param {string} value
     */
    public set $external_reference(value: string) {
        this.external_reference = value;
    }

    /**
     * Setter $payment_method_id
     * @param {string} value
     */
    public set $payment_method_id(value: string) {
        this.payment_method_id = value;
    }

    /**
     * Setter $token
     * @param {string} value
     */
    public set $token(value: string) {
        this.token = value;
    }

    /**
     * Setter $transaction_amount
     * @param {number} value
     */
    public set $transaction_amount(value: number) {
        this.transaction_amount = value;
    }




}