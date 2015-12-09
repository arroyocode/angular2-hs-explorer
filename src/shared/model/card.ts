export class Card {
    constructor(
		private cardId: number,
		private name: string,
		private cardSet: string,
		private type: string,
		private faction: string,
		private rarity: string,
		private cost: number,
		private attack: number,
		private health: number,
		private text: string,
		private flavor: string,
		private artist: string,
		private collectible: boolean,
		private elite: boolean,
		private race: string,
		private img: string,
		private imgGold: string,
		private local: string
    ) {
    }
}