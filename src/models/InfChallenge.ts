export interface Challenge {
    id:string;
    isLive: boolean;
    title: string;
    description: string;
    address: string;
    images_path: { name: string, downloadLink: string}[];
    company:string;
    start_time: Date;
    end_time: Date;
    points_reward:number;
    onPress: () => void;
}
  