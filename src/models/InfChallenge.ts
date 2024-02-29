export interface Challenge {
    id:string;
    Days: string;
    isLive: boolean;
    title: string;
    Address: string;
    images_path: { name: string, downloadLink: string}[];
    onPress: () => void;

}
  