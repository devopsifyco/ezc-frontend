export interface Challenge {
    Days: string;
    isLive: boolean;
    title: string;
    Address: string;
    location: string;
    images_path: { name: string, downloadLink: string}[];
}
  