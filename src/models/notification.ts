interface Avatar {
    name: string;
    downloadLink: string;
    _id: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    highest_points: number;
    avatar: Avatar;
    about_me: string;
    location: string;
}

interface Data {
    challenge_id: string;
    challenge_title: string;
}

interface NotificationType {
    _id: string;
    user_id: User;
    message: string;
    type: string;
    data: Data;
    read: boolean;
    created_at: string;
    __v: number;
}

export default NotificationType;
