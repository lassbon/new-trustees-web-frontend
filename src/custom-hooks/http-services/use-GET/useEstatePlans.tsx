import { useQuery } from "@tanstack/react-query";
import { getEstatePlans } from "../../../config/api";
import { useCookies } from "react-cookie";

const useEstatePlans = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getEstatePlans", { token }],
    queryFn: getEstatePlans,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useEstatePlans;
