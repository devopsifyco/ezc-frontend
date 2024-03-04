export interface Challenge {
    _id:string;
    isLive: boolean;
    title: string;
    description: string;
    Address: string;
    images_path: { name: string, downloadLink: string}[];
    company:string;
    start_time: Date;
    end_time: string;
    points_reward:number;
    onPress: () => void;
}
  