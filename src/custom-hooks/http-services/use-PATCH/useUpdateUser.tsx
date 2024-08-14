import { useMutation } from "@tanstack/react-query";
import { patchUser } from "../../../config/api";
import { useCookies } from "react-cookie";
const useUpdateUser = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => patchUser(data, token),
  });
};

export default useUpdateUser;
