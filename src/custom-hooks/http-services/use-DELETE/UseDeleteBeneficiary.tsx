import { useMutation } from "@tanstack/react-query";
import { DeleteBeneficiary } from "../../../config/api";
import { useCookies } from "react-cookie";
const useDeleteBeneficiary = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => DeleteBeneficiary(data, token),
  });
};

export default useDeleteBeneficiary;
