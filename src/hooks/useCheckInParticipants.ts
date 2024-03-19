import { useMutation } from "@tanstack/react-query";
import { EZCHALLENG_API } from "../api/endPoint";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function useCheckIn() {
    return useMutation({
        mutationKey: ['confirmCheckIn'],
        mutationFn: async ({ challengeId, checkinData }: { challengeId: string; checkinData: any }) => { 
            try {
                const getEmail = await AsyncStorage.getItem('email');
                const email = getEmail ? getEmail.replace(/["']/g, '') : '';
                const userToken = await AsyncStorage.getItem('accessToken');
                const res = await axios.post(`${EZCHALLENG_API}/challenge/check-in`, {
                    email,
                    challengeId,
                    checkinData,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    }
                });

                return res.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'An error occurred during check-in');
            }
        },
        onSuccess: (data: any) => {
           Alert.alert(data);
        },
        onError: (err) => {
            Alert.alert(err.message)
        }
    });
}
