import { useMutation } from "@tanstack/react-query";
import { postBeneficiary } from "../../../config/api";
import { useCookies } from "react-cookie";
const useAddBeneficiary = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => postBeneficiary(data, token),
  });
};

export default useAddBeneficiary;
