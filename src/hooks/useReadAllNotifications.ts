import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { EZCHALLENG_API } from "../api/endPoint";

export default function useReadAllNotifications() {
    
    return useMutation({
        mutationKey: ['readAllNotification'],
        mutationFn: async() => {
            const token = await AsyncStorage.getItem('accessToken');
            const getEmail = await AsyncStorage.getItem('email');
            const email = getEmail ? getEmail.replace(/["']/g, '') : '';
            await axios.post(`${EZCHALLENG_API}/notifications/read`, {email}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: () => console.log('change status all read successfully'),
        onError: () => console.log('change status all read failed!')
        
    })
}
