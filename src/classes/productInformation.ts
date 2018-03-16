import { Variant } from './variant';

export class ProcutInformation {
    id: number;
    name: String;
    description: String;
    alternateNames:
        {
            locale: String;
            title: String;
        }[];

    productCode: String;
    brand: {
        name: String;
        description: String;
    }
    sizeGuide: String;
    isNoSize: boolean;
    isOneSize: boolean;
    webCategories:
        {
            id: number
        }[];
    variants: Variant[];

    media: {
        images:
        {
            url: String;
            type: String;
            colourCode: String;
            colour: String;
            isPrimary: boolean;
        }[];

        catwalk: String[];
        spinset:
        {
            url: String;
            colourCode: String;
        }[];
        swatchSprite: string[];
    };

    badges: String[];
    info: {
        aboutMe: String;
        careInfo: String;
    };
    associatedProductGroups:
        {
            id: number;
            type: String;
            url: String;
        }
    [];
    price: {
        current: {
            value: number;
            text: String;
        };
        previous: {
            value: number;
            text: String;
        };
        rrp: {
            value: number;
            text: String;
        };
        xrp: {
            value: number;
            text: String;
        };
        currency: String;
        isMarkedDown: boolean;
        isOutletPrice: boolean
    };
    shippingRestriction: {
        id: number;
        name: String;
        description: String;
    };
    gender: String;
    isInStock: boolean;
}