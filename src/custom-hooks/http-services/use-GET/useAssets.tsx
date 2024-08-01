import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../../config/api";
import { useCookies } from "react-cookie";

const useAssets = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getAssets", { token }],
    queryFn: getAssets,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useAssets;
