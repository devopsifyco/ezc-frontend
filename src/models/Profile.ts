export interface DataProfile {
    username: string;
    email: string;
    points: number;
    challenges: [];
    image: { name: string, downloadLink: string };
    about_me: string;
    location: string;
}