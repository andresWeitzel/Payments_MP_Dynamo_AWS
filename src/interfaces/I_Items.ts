export interface I_Items {
    id: string;
    title: string;
    description: string | null;
    picture_url: string | null,
    category_id: string,
    quantity: number;
    unit_price: number;
}