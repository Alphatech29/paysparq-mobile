import axios from "axios";
import env from "./config";

export const registerUser = async (full_name, email, password, phone_number) => {
  try {
    const response = await axios.post(
      `${env.BASE_URL}/auth/create-user`,
      { full_name, email, password, phone_number },
      { headers: { "Content-Type": "application/json" } }
    );

    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Registration failed",
      error: error.response?.data,
    };
  }
};
