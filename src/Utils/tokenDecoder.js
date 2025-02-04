import jwtDecode from "jwt-decode";

const decodeToken = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
};
export default decodeToken;
