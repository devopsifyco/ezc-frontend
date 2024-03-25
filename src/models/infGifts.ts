export interface GiftData {
    _id: string,
    name: string,
    description: string,
    points_required: number,
    quantity: number,
    image: {name: string, downloadLink: string},

}

export interface ExChangeData {
    gift_id: string,
    email: string,
    fullname: string,
    phone: string,
    address: string
}

export interface HistoryExChangeGiftData extends ExChangeData {
    gift: GiftData,
    redeemed_at: Date

}