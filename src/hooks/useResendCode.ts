import { EZCHALLENGE_API } from "../api/endPoint";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useResendCode() {

    const resendCode = useMutation({
        mutationKey: ['resendCode'],
        mutationFn: async(email: string) => {
          await axios.post(`${EZCHALLENGE_API}/send-verification-code`, email)
        },
        onSuccess: () => console.log("Resend code Oke"),
        onError: () => console.log("Resend failed!"),
      })
  return  { ...resendCode }
}
