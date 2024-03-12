import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useProfile = () => {
  const {data: dataProfile, mutate} = useMutation({
    mutationKey: ['dataProfile'],
    mutationFn: async () => {
      const email = await AsyncStorage.getItem('email');
      const token = await AsyncStorage.getItem('accessToken');
      const emailUser = email?.slice(1, -1);

      const response = await axios.post(
        `${EZCHALLENG_API}/user`,
        {
          email: emailUser,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      console.log('Data Response:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  return { dataProfile, mutate };
};

export default useProfile;
