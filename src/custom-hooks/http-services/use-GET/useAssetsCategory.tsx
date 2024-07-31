import { useQuery } from "@tanstack/react-query";
import { getAssetsCategory } from "../../../config/api";
import { useCookies } from "react-cookie";

const useAssetsCategory = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getAssetsCategory", { token }],
    queryFn: getAssetsCategory,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useAssetsCategory;
