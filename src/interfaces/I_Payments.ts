export interface I_Payments {
    uuid: string;
    items: I_Items;
    payer: I_Payer;
    shipments: I_Shipments;
    description: string;
    external_reference: string;
    payment_method_id: string;
    token: string;
    transaction_amount: number;
}

export interface I_Items {
    id: string;
    title: string;
    description: string | null;
    picture_url: string | null,
    category_id: string,
    quantity: number;
    unit_price: number;
}

export interface I_Payer {
    id: string;
    first_name: string;
    last_name: string | null;
}

export interface I_ReceiverAddress {
    zip_code: string;
    state_name: string;
    city_name: string;
    street_name: string;
    street_number: number;
}


export interface I_Shipments {
    receiver_address: I_ReceiverAddress;
}



