import { useQuery } from "@tanstack/react-query";
import { getBeneficiaries } from "../../../config/api";
import { useCookies } from "react-cookie";

const useBeneficiaries = () => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;

  return useQuery({
    queryKey: ["getBeneficiaries", { token }],
    queryFn: getBeneficiaries,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useBeneficiaries;
