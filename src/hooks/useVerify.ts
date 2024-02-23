import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import { VerifyData } from '../models/Verify';
import {Alert} from 'react-native';

// const API_VERIFY= `https://${process.env.IP_COMPUTER}:4000/api/send-verification-code`;
const API_VERIFY= `https://${process.env.IP_COMPUTER}:4000/api/send-verification-code`;

export default function useVerify() {
  const verify = useMutation({
    mutationKey: ['verify'],
    mutationFn: async (dataVerify: VerifyData) => {
      const res = await axios.post(API_VERIFY, dataVerify);
      return res.data;
    },
    onSuccess: async data => console.log(data.message),
    onError: error => Alert.alert(error?.response.data.message),
  });

  return {...verify};
}
