import { useQuery } from "@tanstack/react-query";
import { getResetPassword } from "../../../config/api";

type Props = {
  email: String;
};
const useResetPassword = ({ email }: Props) => {
  return useQuery({
    queryKey: ["getResetPassword", { email }],
    queryFn: getResetPassword,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useResetPassword;
