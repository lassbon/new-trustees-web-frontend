import { useMutation } from "@tanstack/react-query";
import { deleteAsset } from "../../../config/api";
import { useCookies } from "react-cookie";


const useDeleteAsset = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => deleteAsset(data, token),
  });
};

export default useDeleteAsset;
