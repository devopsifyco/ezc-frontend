import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function useRatingChallenge() {
    return useQuery({
        queryKey: ['ratings'],
        queryFn: async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            const res = await axios.get(`${EZCHALLENG_API}/leaderboard`, {
              headers: {
                'Content-Type': `application/json`,
                Authorization: `Bearer ${token}`,
              },
            });
            return res.data;
          } catch (error) {
            console.error('Error fetching ratings:', error);
            throw error;
          }
        }
      });
}