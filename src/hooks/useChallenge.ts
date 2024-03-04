import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import { Challenge } from '../models/InfChallenge';

const API_ALLCHALLENGE = `${EZCHALLENG_API}/challenges`;
const API_CHALLENGES = `${EZCHALLENG_API}/challenge`;
const API_UPDATECHALLENS = `${EZCHALLENG_API}/infor`

export function useGetAllChallenges() {
  const getAllChallenges = useMutation({
    mutationKey: ['challenges'],
    mutationFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(API_ALLCHALLENGE, {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
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

export function useGetAllChallengesPending() {
  const getAllChallengesPending = useMutation({
    mutationKey: ['challengesPending'],
    mutationFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(`${API_CHALLENGES}/status/pending`, {
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
    },
    onSuccess: () => console.log('Request successful'),
  });

  return { ...getAllChallengesPending };
}


export function useOneChallenges(_id: string) {
  const getOneChallenge = useMutation({
    mutationKey: ['getOneChallenge', _id], 
    mutationFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(`${API_CHALLENGES}/${_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Successful get one data');
    },
  });

  return { ...getOneChallenge };
}

export function useUpdateChallenges(_id: string) {
  const queryClient = useQueryClient();
  
  const getUpdateChallenge = useMutation({
    mutationKey: ['UpdateChallenge'], 
    mutationFn: async (params: Challenge) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.put(`${API_UPDATECHALLENS}?id=${_id}`, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Successful update data');
    },
  });

  return { ...getUpdateChallenge };
}





export default { 
  useGetAllChallenges, 
  useGetAllChallengesPending,
  useOneChallenges,
  useUpdateChallenges


}