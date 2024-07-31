import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../../config/api";
const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};

export default useLogin;
