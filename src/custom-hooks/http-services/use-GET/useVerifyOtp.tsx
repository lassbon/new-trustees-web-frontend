import { useQuery } from "@tanstack/react-query";
import { getVerifyOtp } from "../../../config/api";
type Props = {
  email: string;
  otp: string;
};
const useVerifyOtp = ({ email, otp }: Props) => {
  return useQuery({
    queryKey: ["getVerifyOtp", { email, otp }],
    queryFn: getVerifyOtp,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useVerifyOtp;
