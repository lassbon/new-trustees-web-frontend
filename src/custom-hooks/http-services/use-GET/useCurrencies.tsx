import { useQuery } from "@tanstack/react-query";
import { getAssetsCurrencies } from "../../../config/api";
import { useCookies } from "react-cookie";

const useAssetsCurrencies = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getAssetsCurrencies", { token }],
    queryFn: getAssetsCurrencies,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useAssetsCurrencies;
