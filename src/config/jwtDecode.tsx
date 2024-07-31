import { jwtDecode, JwtPayload } from "jwt-decode";

const isTokenExpired = (token: any) => {
  if (!token) return;
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    console.log(decodedToken, "token");
    // const currentTime = Date.now() / 1000;
    return decodedToken.exp;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export default isTokenExpired;
