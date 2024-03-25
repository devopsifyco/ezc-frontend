import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EZCHALLENGE_API } from "../api/endPoint";
import axios from "axios";
import { ExChangeData } from "../models/infGifts";

// --------------------get all gift -------------------

export function useGetAllGifts() {
  return useQuery({
    queryKey: ["getGift"],
    queryFn: async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const res = await axios.get(`${EZCHALLENGE_API}/gifts`,
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
        const res = await axios.get(`${EZCHALLENGE_API}/gift/${_id}`, {
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

// ------------------exchange gift -----------------------

export function useExchangeGift() {
  const queryClient = useQueryClient()

  const getExChangeGift = useMutation({
    mutationKey: ['ExChangeGift'],
    mutationFn: async (DataExChange: ExChangeData) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.post(`${EZCHALLENGE_API}/gift/exchange`, DataExChange, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error: any) {

        throw error?.response.data;
      }
    },
    onSuccess: () => {
      console.log('Successful ExChange gift');
      queryClient.invalidateQueries({ queryKey: ['getGift'] });
      queryClient.invalidateQueries({ queryKey: ['dataProfile'] });

    },
    onError: (error: any) => {
      console.log(error?.response.data.message);

    }
  });

  return { ...getExChangeGift };
}

export default {
  useGetAllGifts,
  useOneGift,
  useExchangeGift
}