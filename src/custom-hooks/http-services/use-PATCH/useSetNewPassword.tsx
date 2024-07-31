import { useMutation } from "@tanstack/react-query";
import { patchNewPassword } from "../../../config/api";
const useSetNewPassword = () => {
  return useMutation({
    mutationFn: patchNewPassword,
  });
};

export default useSetNewPassword;
