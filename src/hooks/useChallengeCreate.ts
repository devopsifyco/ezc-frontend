import {useMutation, useQueryClient} from '@tanstack/react-query';
import {EZCHALLENG_API} from '../api/endPoint';
import axios from 'axios';
import {ChallengeCreateDataTypes} from '../models/challenge';

export default function useChallengeCreate() {
  const queryClient = useQueryClient();

  const challengeCreate = useMutation({
    mutationKey: ['challengeCreate'],
    mutationFn: async ({challengeData}: ChallengeCreateDataTypes) => {
      const res = await axios.post(
        `${EZCHALLENG_API}/challenge/create`,
        challengeData,
      );
      return res.data;
    },
    onSuccess: () => {
      //Refresh list challenges
      queryClient.invalidateQueries({queryKey: ['challengesList']});
    },
  });
  return {...challengeCreate};
}
