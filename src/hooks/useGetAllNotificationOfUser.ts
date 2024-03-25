import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EZCHALLENGE_API } from "../api/endPoint";

const useGetAllNotificationOfUser = () => { 
    
    const getData = useQuery({
        queryKey: ['getAllNotificationOfUser'],
        queryFn: async() => {
            const getEmail = await AsyncStorage.getItem('email');
            const email = getEmail ? getEmail.replace(/["']/g, '') : '';
            const token = await AsyncStorage.getItem('accessToken');
            
            const res = await axios.get(`${EZCHALLENGE_API}/notifications/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            return res.data;
        }
    })

    return {...getData};
}

export default useGetAllNotificationOfUser;