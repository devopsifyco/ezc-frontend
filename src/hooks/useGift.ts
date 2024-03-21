import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { EZCHALLENG_API } from "../api/endPoint";
import axios from "axios";


export function useGetAllGifts() {
    return useQuery({
        queryKey: ["getGift"],
        queryFn: async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken");
                const res = await axios.get(`${EZCHALLENG_API}/gifts`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                return res.data
            } catch (error: any) {
                console.error('Error fetching gifts:', error?.response.data);
                throw error;
            }
        }
    })
}


export default {
    useGetAllGifts
}