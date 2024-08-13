import { useMutation } from "@tanstack/react-query";
import { patchNin } from "../../../config/api";
import { useCookies } from "react-cookie";
const useUpdateNin = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => patchNin(data, token),
  });
};

export default useUpdateNin;
