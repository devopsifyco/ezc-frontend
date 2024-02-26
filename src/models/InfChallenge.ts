export interface Challenge {
    id: string;
    Days: string;
    isLive: boolean;
    title: string;
    Address: string;
    location: string;
    images_path: { name: string, dowloadlink: string }[];
}
  