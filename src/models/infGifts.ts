export interface GiftData {
    _id: string,
    name: string,
    description: string,
    points_required: number,
    quantity: number,
    image: {name: string, downloadLink: string},

}