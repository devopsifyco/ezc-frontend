import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_LOGIN = `http://${process.env.IP_COMPUTER}:4000/api/login`;

export default function useLogin() {

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (userData: { email: string; password: string }) => {
      const res = await axios.post(API_LOGIN, userData);
      return res.data;
    },
    onSuccess: async data => {
      AsyncStorage.setItem("accessToken", data.accessToken);
      AsyncStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: error => {
      Alert.alert(error.message),
      console.log(error);
    }
  });

  const autoLogin = async () => {
    try {
      const userdataString  = await AsyncStorage.getItem('userdata');
      if (userdataString) {
        console.log(userdataString);
        const userData = JSON.parse(userdataString);
        const { email, password } = userData;
        login.mutate({ email: email, password: password });
      } else {
        console.log("Empty");
      }
    } catch (error) {
      console.error('Error auto-login:', error);
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return { ...login };
}
