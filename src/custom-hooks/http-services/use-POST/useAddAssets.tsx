import { useMutation } from "@tanstack/react-query";
import { postAddAssets } from "../../../config/api";
import { useCookies } from "react-cookie";
const useAddAssets = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => postAddAssets(data, token),
  });
};

export default useAddAssets;
