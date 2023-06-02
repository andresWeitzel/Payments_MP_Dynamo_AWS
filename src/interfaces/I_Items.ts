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

export async function I_ItemsBuild(obj:I_Items){
  id : obj.id;
  title : obj.title;
  description : obj.description;
  picture_url : obj.picture_url;
  category_id: obj.category_id;
  quantity: obj.quantity;
  unit_price: obj.unit_price;
}