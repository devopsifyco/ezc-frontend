import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EZCHALLENGE_API } from "../api/endPoint";

export default function useDonate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['donatePoints'],
    mutationFn: async(dataDonate) => {
        const token = await AsyncStorage.getItem('accessToken');
        const getEmail = await AsyncStorage.getItem('email');
        const email = getEmail ? getEmail.replace(/["']/g, '') : '';
        const newData = {...(typeof dataDonate === 'object' ? dataDonate : {}), email};
        const res = await axios.post(`${EZCHALLENGE_API}/donation/donate`, newData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dataProfile'] }),
    onError: (err) => console.log(err)
  });
}
