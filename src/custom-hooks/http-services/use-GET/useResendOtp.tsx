import { useQuery } from "@tanstack/react-query";
import { getResendOtp } from "../../../config/api";
type Props = {
  email: string;
};
const useResendOtp = ({ email }: Props) => {
  return useQuery({
    queryKey: ["getResendOtp", { email }],
    queryFn: getResendOtp,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useResendOtp;
