import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { EZCHALLENG_API } from "../api/endPoint";
import axios from "axios";

// --------------------get all gift -------------------

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

// ----------------------get a gift -----------------------

export function useOneGift(_id: string) {
  
    return useQuery({
      queryKey: ['getOneGift', _id],
      queryFn: async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          const res = await axios.get(`${EZCHALLENG_API}/gift/${_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          });
          return res.data;
        } catch (error: any) {
          throw error?.response.data.message;
        }
      }
    });
  }


export default {
    useGetAllGifts,
    useOneGift
}