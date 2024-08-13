import { useMutation } from "@tanstack/react-query";
import { postEstatePlan } from "../../../config/api";
import { useCookies } from "react-cookie";
const useAddEstatePlan = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useMutation({
    mutationFn: (data) => postEstatePlan(data, token),
  });
};

export default useAddEstatePlan;
