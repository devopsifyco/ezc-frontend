import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EZCHALLENG_API } from '../api/endPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useProfile = () => {
  const dataProfile = useQuery({
    queryKey: ['dataProfile'],
    queryFn: async () => {
      const email = await AsyncStorage.getItem('email');
      const token = await AsyncStorage.getItem('accessToken');
      const emailUser = email?.slice(1, -1);

      const response = await axios.get(
        `${EZCHALLENG_API}/user/${emailUser}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.setItem('id_owner', response.data._id);
      return response.data;
    },
  });

  return { ...dataProfile };
};

export default useProfile;
