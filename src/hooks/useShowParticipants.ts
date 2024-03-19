import { useQuery } from "@tanstack/react-query";
import { EZCHALLENG_API } from "../api/endPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useShowParticipants(id_challenge: string) {

    const listParticipants = useQuery({
        queryKey: ['listParticipants'],
        queryFn: async() => {

            const userToken = await AsyncStorage.getItem('accessToken');
            const res = await axios.get(`${EZCHALLENG_API}/challenge/participants/${id_challenge}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            
            return res.data;
        },
    });

    return {...listParticipants}
};