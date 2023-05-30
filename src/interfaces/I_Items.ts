export interface I_Items {
    /**
     * @description identificar del item
     */
    id: string;
    /**
     * @description Nombre de ítem
     */
    title: string;
    /**
     * @description Descripción del ítem
     */
    description: string | null;
    /**
  * @description URL de imagen
  */
    picture_url: string | null,
    /**
    * @description Es la categoría del ítem que se compró. Es posible citar dos formas principales de category_id - categorías insertadas a través de un código, como “MLB189908”, o aquellas que son una tag, como “phone”.
    */
    category_id: string,
    /**
    * @description Cantidad de producto
    */
    quantity: number;
    /**
    * @description Precio unitario del ítem comprado.
    */
    unit_price: number;
}