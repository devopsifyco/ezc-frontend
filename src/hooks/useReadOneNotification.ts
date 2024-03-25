import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { EZCHALLENGE_API } from "../api/endPoint";


export default function useReadOneNotification() {

    return useMutation({
        mutationKey: ['readOneNotification'],
        mutationFn: async(id: string) => {
            const token = await AsyncStorage.getItem('accessToken');
            await axios.post(`${EZCHALLENGE_API}/notification/read`, {id}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: () => console.log('change status read successfully'),
        onError: () => console.log('change status read failed!')
         
        
    })
}
