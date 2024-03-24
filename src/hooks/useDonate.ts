import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { EZCHALLENG_API } from "../api/endPoint";
import { Alert } from "react-native";

export default function useDonate() {
  return useMutation({
    mutationKey: ['donatePoints'],
    mutationFn: async(dataDonate) => {
        const token = await AsyncStorage.getItem('accessToken');
        const getEmail = await AsyncStorage.getItem('email');
        const email = getEmail ? getEmail.replace(/["']/g, '') : '';
        const newData = {...(typeof dataDonate === 'object' ? dataDonate : {}), email};
        const res = await axios.post(`${EZCHALLENG_API}/donation/donate`, newData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        return res.data
    },
    onSuccess: (data) => Alert.alert(data),
    onError: (err) => console.log(err)
  });
}
