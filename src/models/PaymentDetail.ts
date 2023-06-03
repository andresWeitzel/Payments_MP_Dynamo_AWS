//External
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
} from 'class-validator';
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
 * @description Payment Detail class for payment objects
 */
export class PaymentDetail {
    /**
     * @description identificador del pago
     */
    @IsNotEmpty({ message: 'The uuid of the payment details cannot be empty' })
    @IsString({ message: 'The uuid of the payment details must be of type string' })
    @Length(MIN_VALUE_UUID, MAX_VALUE_UUID, { message: `The value of the payment details uuid must be between ${MIN_VALUE_UUID} and ${MAX_VALUE_UUID} characters` })
    private uuid: string;

    /**
 * @description Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
 */
    @IsNotEmpty({ message: 'The description of the payment details cannot be empty' })
    @IsString({ message: 'The description of the payment details must be of type string' })
    @Length(MIN_VALUE_DESCRIPTION, MAX_VALUE_DESCRIPTION, { message: `The value of the payment details description must be between ${MIN_VALUE_DESCRIPTION} and ${MAX_VALUE_DESCRIPTION} characters` })
    private description: string;



    /**
 * @description Es una referencia de pago externa. Podría ser, por ejemplo, un hashcode del Banco Central, funcionando como identificador del origen de la transacción.
 */
    @IsNotEmpty({ message: 'The external reference of the payment details cannot be empty' })
    @IsString({ message: 'The external reference of the payment details must be of type string' })
    @Length(MIN_VALUE_EXTERNAL_REF, MAX_VALUE_EXTERNAL_REF, { message: `The value of the payment details external reference must be between ${MIN_VALUE_EXTERNAL_REF} and ${MAX_VALUE_EXTERNAL_REF} characters` })
    private externalReference: string;


    /**
 * @description Identificador del medio de pago. Indica el ID del medio de pago seleccionado para realizar el pago.
 */
    @IsNotEmpty({ message: 'The payment method id of the payment details cannot be empty' })
    @IsString({ message: 'The payment method id of the payment details must be of type string' })
    @Length(MIN_VALUE_PAYM_MET_ID, MAX_VALUE_PAYM_MET_ID, { message: `The value of the payment details payment method id must be between ${MIN_VALUE_PAYM_MET_ID} and ${MAX_VALUE_PAYM_MET_ID} characters` })
    private paymentMethodId: string;


    /**
 * @description Identificador del token card. (obligatorio para tarjeta de crédito). El token de la tarjeta se crea a partir de la información de la propia tarjeta, aumentando la seguridad durante el flujo de pago.
 */
    @IsNotEmpty({ message: 'The token of the payment details cannot be empty' })
    @IsString({ message: 'The token of the payment details must be of type string' })
    @Length(MIN_VALUE_TOKEN, MAX_VALUE_TOKEN, { message: `The value of the payment details token must be between ${MIN_VALUE_TOKEN} and ${MAX_VALUE_TOKEN} characters` })
    private token: string;

    /**
 * @description Costo del producto. Ejemplo - La venta de un producto por R$ 100,00 tendrá un transactionAmount = 100.
 */
    @IsNotEmpty({ message: 'The transaction amount of the payment details cannot be empty' })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: 'The transaction amount of the payment details must be of type number (decimal) and contain only two decimal places after the separator' })
    @Min(MIN_VALUE_TRANSAC_AMOUNT, { message: `The transaction amount value of the payment details must be greater than ${MIN_VALUE_TRANSAC_AMOUNT}` })
    @Max(MAX_VALUE_TRANSAC_AMOUNT, { message: `The transaction amount value of the payment details must be less than ${MAX_VALUE_TRANSAC_AMOUNT}` })
    private transactionAmount: number;



    constructor(
        $uuid: string,
        $description: string,
        $externalReference: string,
        $paymentMethodId: string,
        $token: string,
        $transactionAmount: number
    ) {
        this.uuid = $uuid;
        this.description = $description;
        this.externalReference = $externalReference;
        this.paymentMethodId = $paymentMethodId;
        this.token = $token;
        this.transactionAmount = $transactionAmount;
    }



    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }


    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }



    public getExternalReference(): string {
        return this.externalReference;
    }

    public setExternalReference(externalReference: string): void {
        this.externalReference = externalReference;
    }


    public getPaymentMethodId(): string {
        return this.paymentMethodId;
    }

    public setPaymentMethodId(paymentMethodId: string): void {
        this.paymentMethodId = paymentMethodId;
    }


    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }


    public getTransactionAmount(): number {
        return this.transactionAmount;
    }

    public setTransactionAmount(transactionAmount: number): void {
        this.transactionAmount = transactionAmount;
    }




}