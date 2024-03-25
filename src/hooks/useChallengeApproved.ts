import { useQuery } from "@tanstack/react-query";
import { EZCHALLENGE_API } from "../api/endPoint";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useGetOneChallengesApproved(idChallennge: string) {
    return useQuery({
      queryKey: ['challengesApproved'],
      queryFn: async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          const res = await axios.get(`${EZCHALLENGE_API}/challenge/status/approved/${idChallennge}`, {
            headers: {
              'Content-Type': `application/json`,
              Authorization: `Bearer ${token}`,
            },
          });
          return res.data;
        } catch (error) {
          console.error('Error fetching challenges pending:', error);
          throw error;
        }
      }
    });
  }