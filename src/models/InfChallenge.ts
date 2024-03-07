export interface Challenge {
    id:string;
    isLive: boolean;
    title: string;
    description: string;
    address: string;
    images_path: { fileName: string, base64: string}[];
    company:string;
    start_time: Date;
    end_time: Date;
    points_reward:number;
    onPress: () => void;
}
  