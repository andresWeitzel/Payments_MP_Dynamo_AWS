
        /**
        * @description Lista de ítems a pagar
        */
export class Item {
    /**
     * @description identificar del item
     */
    private id: string;

    /**
     * @description Nombre de ítem
     */
    private title: string;

    /**
     * @description Descripción del ítem
     */
    private description: string;

    /**
     * @description URL de imagen
     */
    private pictureUrl: string;

    /**
    * @description Es la categoría del ítem que se compró. Es posible citar dos formas principales de category_id - categorías insertadas a través de un código, como “MLB189908”, o aquellas que son una tag, como “phone”.
    */
    private categoryId: string;

    /**
    * @description Cantidad de producto
    */
    private quantity: number;

    /**
    * @description Precio unitario del ítem comprado.
    */
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