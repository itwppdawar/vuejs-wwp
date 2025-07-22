import Cookies from "js-cookie";

export default function authHeader() {
  try {
    // Ambil token dari sessionStorage
    const token = sessionStorage.getItem("user");
    if (!token) {
      console.error("Token not found in sessionStorage");
      return {};
    }

    // Parse token ke dalam bentuk objek JSON
    const user = JSON.parse(token);
    if (user && user.data && user.data.token) {
      // Mengembalikan header otorisasi yang valid
      return { Authorization: "Bearer " + user.data.token };
    } else {
      console.error("Invalid user data or token not found in user object");
      return {};
    }
  } catch (error) {
    console.error("Failed to parse token. Error:", error);
    return {};
  }
}
