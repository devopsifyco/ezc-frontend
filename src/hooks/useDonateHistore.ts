import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EZCHALLENGE_API } from "../api/endPoint";

export default function useDonateHistore() {
    return useQuery({
        queryKey: ['getDonateHistory'],
        queryFn: async () => {
            try {
                const getEmail = await AsyncStorage.getItem('email');
                const email = getEmail ? getEmail.replace(/["']/g, '') : '';
                const userToken = await AsyncStorage.getItem('accessToken');
                const response = await axios.get(`${EZCHALLENGE_API}/donation/history/${email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                return response.data;
            } catch (error) {
                console.error("Error while fetching user donation history:", error);
                throw new Error("Failed to fetch donation history");
            }
        }
    });
}
