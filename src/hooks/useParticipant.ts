import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EZCHALLENG_API } from '../api/endPoint';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function useParticipant({ id }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getParticipant'],
    queryFn: async () => {
      try {
        const tokenUser = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(`${EZCHALLENG_API}/challenge/participants/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenUser}`,
          },
        });
        
        return res.data;
      } catch (e) {
        console.log(e);
      }
    }
  })
  console.log('lấy data: ', data);
  
  return { data, isLoading, isError };
}
