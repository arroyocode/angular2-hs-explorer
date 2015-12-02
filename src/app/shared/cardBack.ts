export class CardBack {
    cardBackId: number;
    name: string;
    description: string;
    source: string;
    sourceDescription: string;
    enabled: boolean;
    img: string;
    imgAnimated: string;
    sortCategory: number;
    sortOrder: number;
    locale: string;
    constructor(
        cardBackId: number,
        name: string,
        description: string,
        source: string,
        sourceDescription: string,
        enabled: boolean,
        img: string,
        imgAnimated: string,
        sortCategory: number,
        sortOrder: number,
        locale: string
    ) {
        this.cardBackId = cardBackId,
        this.name = name,
        this.description = description,
        this.source = source,
        this.sourceDescription = sourceDescription,
        this.enabled = enabled,
        this.img = img,
        this.imgAnimated = imgAnimated,
        this.sortCategory = sortCategory,
        this.sortOrder = sortOrder,
        this.locale = locale
    }
}