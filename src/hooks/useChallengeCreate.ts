import {useMutation, useQueryClient} from '@tanstack/react-query';
import {EZCHALLENG_API} from '../api/endPoint';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export default function useChallengeCreate() {
  const queryClient = useQueryClient();

  const challengeCreate = useMutation({
    mutationKey: ['challengeCreate'],
    mutationFn: async ({ data }: any) => {    
      const tokenUser = await AsyncStorage.getItem('accessToken');

      const res = await axios.post(
        `http://192.168.102.53:4000/api/challenge/create`,
        // `${EZCHALLENG_API}/challenge/create`,
        data,
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
      Alert.alert("Create challenge successful");
      queryClient.invalidateQueries({queryKey: ['challengesList']});
    },
    onError: error => Alert.alert(error.message),
  });
  return {...challengeCreate};
}
