import { useMutation } from "@tanstack/react-query";
import { patchBeneficiary } from "../../../config/api";
import { useCookies } from "react-cookie";
const useUpdateBeneficiary = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => patchBeneficiary(data, token),
  });
};

export default useUpdateBeneficiary;
