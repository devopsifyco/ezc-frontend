import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EZCHALLENGE_API} from '../api/endPoint';
const API_LOGIN = `${EZCHALLENGE_API}/login`;

export default function useLogin() {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (userData: {email: string; password: string}) => {
      const res = await axios.post(API_LOGIN, userData);
      return res.data;
    },
    onSuccess: async data => {
      AsyncStorage.setItem('accessToken', data.accessToken);
      AsyncStorage.setItem('refreshToken', data.refreshToken);
    },
    onError: (error: any) => {
      Alert.alert(error?.response.data.message);
      console.log(error?.response.data.message);
    },
  });

  return {...login};
}
