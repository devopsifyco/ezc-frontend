import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import { Challenge } from '../models/InfChallenge';

const API_ALLCHALLENGE = `${EZCHALLENG_API}/challenges`;
const API_CHALLENGES = `${EZCHALLENG_API}/challenge`;


//  --------------get all list challenge ----------------------
export function useGetAllChallenges() {
  const getAllChallenges = useMutation({
    mutationKey: ['challengesList'],
    mutationFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(API_ALLCHALLENGE, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
    },
    onSuccess: () => console.log('Get all challenge successful'),
  });

  return { ...getAllChallenges };
}


//  -----------get get all challenge by status ---------------------

export function useGetAllChallengesByStatus(status: string) {
  return useQuery({
    queryKey: ['challenges', status],
    queryFn: async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(`${API_CHALLENGES}/status/${status}`, {
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

//  -----------get one challenge ---------------------

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

// ----------------------------------
export function useUpdateChallenges( ) {
  const getUpdateChallenge = useMutation({
    mutationKey: ['UpdateChallenge'], 
    mutationFn: async (params: Challenge) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        // const res = await axios.put(`${API_CHALLENGES}/update`, params, {
        const res = await axios.put(`http://192.168.56.96:4000/api/update`, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error('Error updating challenge:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Successful update data');
    },
  });

  return { ...getUpdateChallenge };
}





//  -----------delete challenge  -------------------


export function useDeleteChallenges() {
  const getDeleteChallenge = useMutation({
    mutationKey: ['DeleteChallenge'], 
    mutationFn: async (params: {id: string | null}) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.delete(`${API_CHALLENGES}/delete`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: params,
        });
        return res.data;
      } catch (error) {
        console.error('Error delete challenge:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Delete Successful');
    },
  });

  return { ...getDeleteChallenge };
}



export default { 
  useGetAllChallenges, 
  useGetAllChallengesByStatus,
  useOneChallenges,
  useDeleteChallenges,
  useUpdateChallenges

}