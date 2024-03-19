import { useMutation, MutationFunction } from "@tanstack/react-query";
import { EZCHALLENG_API } from "../api/endPoint";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface Participant {
    userId: string;
    isCheckin: boolean;
}

export default function useCheckIn() {
    const checkInMutation = useMutation<void, Error, { email: string; challengeId: string; checkinData: Participant[] }>({
        mutationKey: ['confirmCheckIn'],
        mutationFn: async ({ email, challengeId, checkinData }) => {
            try {
                const userToken = await AsyncStorage.getItem('accessToken');
                const res = await axios.post(`${EZCHALLENG_API}/challenge/check-in`, {
                    email,
                    challengeId,
                    checkinData: checkinData.map(participant => ({ userId: participant.userId, isCheckin: true })),
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

    const checkIn = async (email: string, challengeId: string, checkinData: Participant[]) => {
        checkInMutation.mutate({ email, challengeId, checkinData });
    };

    return { checkIn };
}
