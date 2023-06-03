//External
import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";
//Vars-const
const MIN_VALUE_ID = 1;
const MAX_VALUE_ID = 25;
const MIN_VALUE_TITLE = 1;
const MAX_VALUE_TITLE = 25;
const MIN_VALUE_DESCRIP = 1;
const MAX_VALUE_DESCRIP = 500;
const MIN_VALUE_PICT_URL = 1;
const MAX_VALUE_PICT_URL = 1000;
const MIN_VALUE_CATEG_ID = 1;
const MAX_VALUE_CATEG_ID = 50;
const MIN_VALUE_QUANTITY = 1;
const MAX_VALUE_QUANTITY = 2000;
const MIN_VALUE_UNIT_PRICE = 230.0;
const MAX_VALUE_UNIT_PRICE = 900000.0;

/**
* @description Lista de ítems a pagar
*/
export class Item {
    /**
     * @description identificar del item
     */
    @IsNotEmpty({ message: 'The id of item cannot be empty' })
    @IsString({ message: 'The id of item must be of type string' })
    @Length(MIN_VALUE_ID, MAX_VALUE_ID, { message: `The value of the item id must be between ${MIN_VALUE_ID} and ${MAX_VALUE_ID} characters` })
    private id: string;

    /**
     * @description Nombre de ítem
     */
    @IsNotEmpty({ message: 'The title of the item cannot be empty' })
    @IsString({ message: 'The title of the item must be of type string' })
    @Length(MIN_VALUE_TITLE, MAX_VALUE_TITLE, { message: `The value of the item title must be between ${MIN_VALUE_TITLE} and ${MAX_VALUE_TITLE} characters` })
    private title: string;

    /**
     * @description Descripción del ítem
     */
    @IsNotEmpty({ message: 'The description of the item cannot be empty' })
    @IsString({ message: 'The description of the item must be of type string' })
    @Length(MIN_VALUE_DESCRIP, MAX_VALUE_DESCRIP, { message: `The value of the item description must be between ${MIN_VALUE_DESCRIP} and ${MAX_VALUE_DESCRIP} characters` })
    private description: string;

    /**
     * @description URL de imagen
     */
    @IsNotEmpty({ message: 'The picture url of the item cannot be empty' })
    @IsString({ message: 'The picture url of the item must be of type string' })
    @Length(MIN_VALUE_PICT_URL, MAX_VALUE_PICT_URL, { message: `The value of the item picture url must be between ${MIN_VALUE_PICT_URL} and ${MAX_VALUE_PICT_URL} characters` })
    private pictureUrl: string;

    /**
    * @description Es la categoría del ítem que se compró. Es posible citar dos formas principales de category_id - categorías insertadas a través de un código, como “MLB189908”, o aquellas que son una tag, como “phone”.
    */
    @IsNotEmpty({ message: 'The category id of the item cannot be empty' })
    @IsString({ message: 'The category id of the item must be of type string' })
    @Length(MIN_VALUE_CATEG_ID, MAX_VALUE_CATEG_ID, { message: `The value of the item category id must be between ${MIN_VALUE_CATEG_ID} and ${MAX_VALUE_CATEG_ID} characters` })
    private categoryId: string;

    /**
    * @description Cantidad de producto
    */
    @IsNotEmpty({message: 'The quantity of the item cannot be empty'})
    @IsInt({message: 'The quantity of the item must be of type integer'})
    @Min(MIN_VALUE_QUANTITY,{message:'quantity item value must be greater than zero'})
    @Max(MAX_VALUE_QUANTITY, {message:`quantity item value must be less than ${MAX_VALUE_QUANTITY}`})
    private quantity: number;

    /**
    * @description Precio unitario del ítem comprado.
    */
    @IsNotEmpty({ message: 'The unit price of the item cannot be empty' })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: 'The unit price of the item must be of type number (decimal) and contain only two decimal places after the separator' })
    @Min(MIN_VALUE_UNIT_PRICE, { message: `The unit price of the item value must be greater than ${MIN_VALUE_UNIT_PRICE}` })
    @Max(MAX_VALUE_UNIT_PRICE, { message: `The unit price of the item value must be less than ${MAX_VALUE_UNIT_PRICE}` })
    private unitPrice: number;

    constructor($id: string, $title: string, $description: string, $pictureUrl: string, $categoryId: string, $quantity: number, $unitPrice: number) {
        this.id = $id;
        this.title = $title;
        this.description = $description;
        this.pictureUrl = $pictureUrl;
        this.categoryId = $categoryId;
        this.quantity = $quantity;
        this.unitPrice = $unitPrice;
    }


    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(pictureUrl: string): void {
        this.pictureUrl = pictureUrl;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getUnitPrice(): number {
        return this.unitPrice;
    }

    public setUnitPrice(unitPrice: number): void {
        this.unitPrice = unitPrice;
    }

}