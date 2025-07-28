import Cookies from "js-cookie";

export default function authHeader() {
  try {
    // Ambil token dari cookie
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token not found in cookie");
      return {};
    }

    // Token sudah dalam bentuk access token, tidak perlu di-parse sebagai JSON
    // Mengembalikan header otorisasi yang valid
    return { Authorization: "Bearer " + token };
  } catch (error) {
    console.error("Failed to get token. Error:", error);
    return {};
  }
}
