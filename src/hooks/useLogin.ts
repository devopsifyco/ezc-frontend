import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_LOGIN = `http://${process.env.IP_COMPUTER}:4000/api/login`;

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
    onError: error => {
      Alert.alert(error?.response.data.message);
      console.log(error?.response.data.message);
    },
  });

  return {...login};
}
