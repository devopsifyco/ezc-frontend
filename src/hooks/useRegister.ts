import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {RegistrationData} from '../models/Register';
import {Alert} from 'react-native';
import {EZCHALLENG_API} from '../api/endPoint';

const API_REGISTER = `${EZCHALLENG_API}/sign-up`;

export default function useRegister() {
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (dataRegister: RegistrationData) => {
      const res = await axios.post(API_REGISTER, dataRegister);
      return res.data;
    },
    onSuccess: async data => {
      console.log(data.message);
    },
    onError: (error: any) => {
      console.log(error?.response.data.message);
      Alert.alert(error?.response.data.message);
    },
  });

  return {...register};
}
