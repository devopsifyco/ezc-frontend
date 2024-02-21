import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
const API_LOGIN = `http://${process.env.IP_COMPUTER}:4000/api/login`;

export default function useLogin() {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async dataLogin => {
      const res = await axios.post(API_LOGIN, dataLogin);
      return res.data;
    },
    onSuccess: data => Alert.alert(data.message),
    onError: data => Alert.alert(data.message),
  });

  return {...login};
}
