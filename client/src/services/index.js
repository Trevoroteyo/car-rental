import axios from "axios";
const backend = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backend); // should log http://localhost:5000
// Ensure axios sends cookies (httpOnly) for cross-site requests by default
axios.defaults.withCredentials = true;

export const signUpService = async (formData) => {
  try {
    const { data } = await axios.post(`${backend}/api/auth/register`, formData);

    return data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error Signing Up",
    };
  }
};

export const signInService = async (formData) => {
  try {
    const { data } = await axios.post(`${backend}/api/auth/login`, formData, {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error Logging In",
    };
  }
};

export const getProfile = async () => {
  try {
    const { data } = await axios.get(`${backend}/api/auth/profile`, {
      withCredentials: true, // include cookies
    });
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      message: "Error fetching profile",
    };
  }
};

export const carSearch = async (params) => {
  try {
    const { data } = await axios.post(`${backend}/api/car/car-search`, params);

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error searching for cars",
    };
  }
};

export const addNewCar = async (formData) => {
  try {
    const { data } = await axios.post(
      `${backend}/api/car/add-new-car`,
      formData
    );

    return data;
  } catch (error) {
    console.error("Error adding car:", error);
    return { success: false, message: "Server error" };
  }
};

export const uploadCarImages = async (payload) => {
  try {
    const { data } = await axios.post(
      `${backend}/api/car/upload-images`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: "Error uploading images",
    };
  }
};

export const becomeOwner = async (userId) => {
  try {
    const { data } = await axios.put(
      `${backend}/api/user/become-owner/${userId}`
    );

    return data;
  } catch (error) {
    console.log(`Role update error ${error}`);
    return {
      success: false,
      message: "Error becoming owner role",
    };
  }
};

export const logoutUser = async () => {
  try {
    // include credentials so the server can clear the httpOnly cookie
    const { data } = await axios.post(
      `${backend}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(`Error logging out ${error}`);
    return {
      success: false,
      message: "Logged out successfully!",
    };
  }
};

export const getCars = async (userId) => {
  try {
    const { data } = await axios.get(`${backend}/api/car/get-cars/${userId}`);
    return data;
  } catch (error) {
    console.log(`Error logging out ${error}`);
    return {
      success: false,
      message: "Failed to fetch cars",
    };
  }
};

export const getAllCars = async () => {
  try {
    const { data } = await axios.get(`${backend}/api/car/get-all-cars`);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);

    return {
      success: false,
      message: "Fetch all cars",
    };
  }
};

export const getCarDetails = async (carId) => {
  try {
    const { data } = await axios.get(
      `${backend}/api/car/get-car-details/${carId}`
    );
    return data;
  } catch (error) {
    console.log(`Error fetching car details: ${error}`);

    return {
      success: false,
      message: "Error fetching car details",
    };
  }
};

export const bookCar = async (formData) => {
  try {
    const { data } = await axios.post(
      `${backend}/api/booking/book-car`,
      formData
    );
    return data;
  } catch (error) {
    console.log(`Error booking car : ${error}`);

    return {
      success: false,
      message: "Error booking car.",
    };
  }
};

export const getMyBookings = async (userId) => {
  try {
    const { data } = await axios.get(
      `${backend}/api/booking/get-my-bookings/${userId}`
    );
    return data;
  } catch (error) {
    console.log("Error getting myBookings", error);
    return {
      success: false,
      message: "Failed to get my bookings",
    };
  }
};
