import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_ALLCHALLENGE = `http://${process.env.IP_COMPUTER}:4000/api/challenges`;

export default function useGetAllChallenges() {
  const getAllChallenges = useMutation({
    mutationKey: ['challenges'],
    mutationFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(API_ALLCHALLENGE, {
          headers: {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${token}`
          },
        });
        return res.data;
      } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
    },
    onSuccess: () => console.log('Request successful'),
  });

  return { ...getAllChallenges };
}
