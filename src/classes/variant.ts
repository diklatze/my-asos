import { Binary } from "@angular/compiler";

export class Variant {

    id: number;
    name: String;
    sizeId: number;
    brandSize: String;
    sizeDescription: String;
    sizeOrder: number;
    sku: String;
    isLowInStock: Boolean;
    isInStock: Boolean;
    colourCode: String;
    colour: String;
    price: {
        current: {
            value: number;
            text: String;
        },
        previous: {};
        rrp: {};
        xrp: {};
        currency: String;
        isMarkedDown: false;
        isOutletPrice: false;
    };
    isPrimary: Boolean;

}
