import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../config/api";
import { useCookies } from "react-cookie";

const useUser = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getUser", { token }],
    queryFn: getUser,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useUser;
