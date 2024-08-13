import { jwtDecode, JwtPayload } from "jwt-decode";

const isTokenExpired = (token: any) => {
  if (!token) return;
  try {
    const decodedToken: any = jwtDecode<JwtPayload>(token);
    console.log(decodedToken, "token");
    const expDate = new Date(decodedToken?.exp * 1000);
    const expHour = expDate.getHours();
    const iatDate = new Date(decodedToken?.iat * 1000);
    const iatHour = iatDate.getHours();
    const timeDiff = expHour - iatHour;
    return timeDiff;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export default isTokenExpired;
