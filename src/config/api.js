import axios from "axios";

export const postLogin = async (data) => {
  return await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, data);
}; //used

export const postRegister = async (data) => {
  return await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/user/create`,
    data
  );
}; //used

export const postAddAssets = async (data, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  console.log(token, "token");
  return await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/assets/add`,
    data,
    { headers }
  );
}; //used

export const postBeneficiary = async (data, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/beneficiary/add`,
    data,
    { headers }
  );
}; //used

export const patchBeneficiary = async (data, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const { id } = data;
  delete data?.id;
  return await axios.patch(
    `${import.meta.env.VITE_APP_API_URL}/beneficiary/update/${id}`,
    data,
    { headers }
  );
}; //used

export const patchNewPassword = async (data) => {
  console.log("new", data);
  const { password, hash } = data;
  const newpassword = { newPassword: password };
  return await axios.patch(
    `${import.meta.env.VITE_APP_API_URL}/user/forget-password/complete/${hash}`,
    newpassword
  );
}; //used

export const getUser = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/user`, {
    headers,
  });
}; //used

export const getAssets = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/assets`, {
    headers,
  });
}; //used

export const getBeneficiaries = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/beneficiary/list/`,
    {
      headers,
    }
  );
}; //used

export const getAssetsCategory = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/assets/category`,
    {
      headers,
    }
  );
}; //used

export const getAssetInfo = async ({ queryKey }) => {
  const [_key, { token, asset_id }] = queryKey;
  console.log(asset_id);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/assets/category-fields/${asset_id}`,
    {
      headers,
    }
  );
}; //used

export const getEstatePlans = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/estate-plans`, {
    headers,
  });
}; //used

export const getResetPassword = async ({ queryKey }) => {
  const [_key, { email }] = queryKey;
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/user/forget-password/start/${email}`
  );
}; //used

export const getVerifyOtp = async ({ queryKey }) => {
  const [_key, { email, otp }] = queryKey;
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/user/verify-otp/${email}/${otp}`
  );
}; //used

export const getResendOtp = async ({ queryKey }) => {
  const [_key, { email }] = queryKey;
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/user/resend-otp/${email}`
  );
}; //used

export const DeleteBeneficiary = async (beneficiary_id, token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  console.log(token, "token");
  return await axios.delete(
    `${import.meta.env.VITE_APP_API_URL}/beneficiary/delete/${beneficiary_id}`,
    { headers }
  );
}; //used
