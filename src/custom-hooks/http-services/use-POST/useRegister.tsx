// use-POST/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../../config/api";
const useRegister = () => {
  return useMutation({ mutationFn: postRegister });
};

export default useRegister;
