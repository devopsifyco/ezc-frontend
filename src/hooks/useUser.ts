import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import { Alert } from 'react-native';

export function useUpdateUserProfile() {
  const getUpdateUserProfile = useMutation({
    mutationKey: ['user'],
    mutationFn: async () => {

      const token = await AsyncStorage.getItem('accessToken');
      console.log(token);
      const res = await axios.put(`${EZCHALLENG_API}/user/update`, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;

    },
    onSuccess: () => console.log('Edit successfully'),
    onError: (error) => Alert.alert(error.message)

  });

  return { ...getUpdateUserProfile };
}
