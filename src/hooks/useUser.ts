import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENGE_API } from '../api/endPoint';
import { Alert } from 'react-native';

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const updateUserProfile = useMutation({
    mutationKey: ['userUpdate'],
    mutationFn: async (newData) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const res = await axios.put(`${EZCHALLENGE_API}/user/update`, newData, {
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dataProfile']}),
    onError: (error) => Alert.alert('Error', error.message),
  });

  return { ...updateUserProfile };
}
