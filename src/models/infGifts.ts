export interface GiftData {
    _id: string,
    name: string,
    description: string,
    points_required: number,
    quantity: number,
    image: {name: string, downloadLink: string},

}

export interface ExChangeData {
    email: string,
    gift_id: string,
    fullname: string,
    phone: string,
    address: string
}
