import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import { Alert } from 'react-native';

export function useUpdateUserProfile() {

  const updateUserProfile = useMutation({
    mutationKey: ['user'],
    mutationFn: async (newData) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const res = await axios.put(`${EZCHALLENG_API}/user/update`, newData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;
      } catch (error) {
        throw new Error('Failed to update user profile');
      }
    },
    onSuccess: () => console.log('Edit successfully'),
    onError: (error) => Alert.alert('Error', error.message),
  });

  return { ...updateUserProfile };
}
