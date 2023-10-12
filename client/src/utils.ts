export function isStickerMessage(data: any): data is {
	stickerId: number;
	timestamp: number;
	side: number;
} {
	return "stickerId" in data;
}
