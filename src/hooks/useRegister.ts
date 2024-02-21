import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {RegistrationData} from '../models/Register';
import {Alert} from 'react-native';

const API_REGISTER = 'https://ezc-test-api.greenbee.gke.vn/api/sign-up';

export default function useRegister() {
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (dataRegister: RegistrationData) => {
      const res = await axios.post(API_REGISTER, dataRegister);
      return res.data;
    },
    onSuccess: () => Alert.alert('Registration successful'),
  });

  return {...register};
}
