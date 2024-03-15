import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import { Challenge } from '../models/InfChallenge';

const API_ALLCHALLENGE = `${EZCHALLENG_API}/challenges/not-participate`;
const API_CHALLENGES = `${EZCHALLENG_API}/challenge`;


//  --------------get all list challenge ----------------------
export function useGetAllChallenges() {
  const queryClient = useQueryClient()

  const getAllChallenges = useMutation({
    mutationKey: ['challengesList'],
    mutationFn: async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const newEmail = email ? email.replace(/["']/g, '') : '';
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.post(
          API_ALLCHALLENGE, { email: newEmail },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Get all challenge successful'),
        queryClient.invalidateQueries({ queryKey: ['challengesList'] });
    }

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

// ----------------------------------Update challenge---------------------------
export function useUpdateChallenges() {
  const queryClient = useQueryClient()

  const getUpdateChallenge = useMutation({
    mutationKey: ['UpdateChallenge'],
    mutationFn: async (params: Challenge) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.put(`${API_CHALLENGES}/update`, params, {
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
      queryClient.invalidateQueries({ queryKey: ['challenges', 'pending'] });
    },
  });

  return { ...getUpdateChallenge };
}



//  -----------delete challenge  -------------------


export function useDeleteChallenges() {
  const getDeleteChallenge = useMutation({
    mutationKey: ['DeleteChallenge'],
    mutationFn: async (params: { id: string | null }) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.delete(`${API_CHALLENGES}/delete`, {
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

//------------------join challenge-----------------------------

export function useJoinChallenge() {
  const queryClient = useQueryClient()

  const getJoinChallenge = useMutation({
    mutationKey: ['JoinChallenge'],
    mutationFn: async (dataJoin: { email: string, id: string }) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await axios.post(`${API_CHALLENGES}/join`, dataJoin, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        throw new Error("Failed join challenge");
      }
    },
    onSuccess: () => {
      console.log('Successful join data');
      queryClient.invalidateQueries({ queryKey: ['challengesList'] });

    },
    onError: (error: any) => {
      console.log(error?.response.data.message);

    }
  });

  return { ...getJoinChallenge };
}

//---------------------complete challenge------------------------------


export function useCompleteChallenge() {
  const queryClient = useQueryClient();

  const getCompleteChallenge = useMutation({
    mutationKey: ['CompleteChallenge'],
    mutationFn: async (dataComplete: { email: string, id: string }) => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const res = await axios.post(`${API_CHALLENGES}/complete`, dataComplete, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
        return res.data
      } catch (error: any) {
        throw error?.response.data.message;
      }
    },
    onSuccess: () => {
      console.log('Successful complete data');
      queryClient.invalidateQueries({ queryKey: ['challenges', 'approved'] });
      queryClient.invalidateQueries({ queryKey: ['challenges', 'pending'] });
    },
    onError: (error: any) => {
      console.log(error?.response.data.message);
    }

  })

  return { ...getCompleteChallenge };
}

export default {
  useGetAllChallenges,
  useGetAllChallengesByStatus,
  useOneChallenges,
  useDeleteChallenges,
  useUpdateChallenges,
  useJoinChallenge,
  useCompleteChallenge

}