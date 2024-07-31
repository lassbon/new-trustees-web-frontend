import { useQuery } from "@tanstack/react-query";
import { getAssetInfo } from "../../../config/api";
import { useCookies } from "react-cookie";

type Props = {
  asset_id: String;
};
const useAssetsInfo = ({ asset_id }: Props) => {
  const [cookie] = useCookies(["auth"]);
  const { token } = cookie.auth;
  return useQuery({
    queryKey: ["getAssetInfo", { token, asset_id }],
    queryFn: getAssetInfo,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useAssetsInfo;
