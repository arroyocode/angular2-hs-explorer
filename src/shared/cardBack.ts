export class CardBack {
    constructor(
       	private cardBackId: number,
        private name: string,
        private description: string,
        private source: string,
        private sourceDescription: string,
        private enabled: boolean,
        private img: string,
        private imgAnimated: string,
        private sortCategory: number,
        private sortOrder: number,
        private locale: string
    ) {
    }
}