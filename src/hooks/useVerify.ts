import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { VerifyData } from '../models/Verify';
import { Alert } from 'react-native';
import { EZCHALLENG_API } from '../api/endPoint';

const API_VERIFY = `${EZCHALLENG_API}/verify-email`;

export default function useVerify() {
  const verify = useMutation({
    mutationKey: ['verify'],
    mutationFn: async (dataVerify: VerifyData) => {
      const { email, code } = dataVerify;
      const res = await axios.post(API_VERIFY, { email, code });
      return res.data;
    },
    onSuccess: data => {
      console.log(data.message)
      Alert.alert(data.message)
    },
    onError: error => {
      console.error('Verification error:', error.name);
      Alert.alert(error.message);
    } 
  });

  return { ...verify };
}
