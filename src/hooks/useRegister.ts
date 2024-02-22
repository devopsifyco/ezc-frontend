import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {RegistrationData} from '../models/Register';
import {Alert} from 'react-native';

const API_REGISTER = `https://${process.env.IP_COMPUTER}:4000/api/sign-up`;

export default function useRegister() {
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (dataRegister: RegistrationData) => {
      const res = await axios.post(API_REGISTER, dataRegister);
      return res.data;
    },
    onSuccess: async data => console.log(data.message),
    onError: error => Alert.alert(error?.response.data.message),
  });

  return {...register};
}
