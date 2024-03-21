export interface Challenge {
    _id: string;
    owner_id: string;
    id:string;
    isLive: boolean;
    title: string;
    description: string;
    address: string;
    images_path: {
      downloadLink: string
}[];
    company:string;
    start_time: Date;
    end_time: Date;
    points_reward:number;
    onPress: () => void;
}
  