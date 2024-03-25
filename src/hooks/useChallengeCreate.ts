import {useMutation, useQueryClient} from '@tanstack/react-query';
import {EZCHALLENGE_API} from '../api/endPoint';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export default function useChallengeCreate() {
  const queryClient = useQueryClient();

  const challengeCreate = useMutation({
    mutationKey: ['challengeCreate'],
    mutationFn: async ({ data, email }: any) => {
      const tokenUser = await AsyncStorage.getItem('accessToken');
      
      const modifyEmail = email.substring(1, email.length - 1)
      console.log("email ennene", email);
      const fullData = {
        ...data,
        "email": modifyEmail
      }
      const res = await axios.post(
        `${EZCHALLENGE_API}/challenge/create`,
        fullData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenUser}`,
          },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['challenges', 'pending']});
    },
    onError: error => Alert.alert(error.message),
  });
  return {...challengeCreate};
}
