//External
import {
    IsNotEmpty,
    IsString,
    Length
} from 'class-validator';
//Vars-const
const MIN_VALUE_ID = 1;
const MAX_VALUE_ID = 25;
const MIN_VALUE_FIRST_LASTNAME = 3;
const MAX_VALUE_FIRST_LASTNAME = 50;

/**
 * @description El payer es quien realiza el pago. Este campo es un objeto que tiene la información del pagador.
 */
export class Payer {

        /**
     * @description identificador del pagador
     */
    @IsNotEmpty({ message: 'The id cannot be empty' })
    @IsString({ message: 'The id must be of type string' })
    @Length(MIN_VALUE_ID, MAX_VALUE_ID, { message: `The value of the id must be between ${MIN_VALUE_ID} and ${MAX_VALUE_ID} characters` })
    private id: string;

    @IsNotEmpty({ message: 'The first name cannot be empty' })
    @IsString({ message: 'The first name must be of type string' })
    @Length(MIN_VALUE_FIRST_LASTNAME, MAX_VALUE_FIRST_LASTNAME, { message: `The value of the first name must be between ${MIN_VALUE_FIRST_LASTNAME} and ${MAX_VALUE_FIRST_LASTNAME} characters` })
    private firstName: string;

    @IsNotEmpty({ message: 'The last name cannot be empty' })
    @IsString({ message: 'The last name must be of type string' })
    @Length(MIN_VALUE_FIRST_LASTNAME, MAX_VALUE_FIRST_LASTNAME, { message: `The value of the last name must be between ${MIN_VALUE_FIRST_LASTNAME} and ${MAX_VALUE_FIRST_LASTNAME} characters` })
    private lastName: string;

    constructor(
        $id: string,
        $firstName: string,
        $lastName: string
    ) {
        this.id = $id;
        this.firstName = $firstName;
        this.lastName = $lastName;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }


}