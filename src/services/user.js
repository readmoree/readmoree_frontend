import axios from "axios";

const USER_SERVICE_URL = `${process.env.REACT_APP_USER_SERVICE_URL}/user`;
const BOOK_SERVICE_URL = `${process.env.REACT_APP_BOOK_SERVICE_URL}`;
const ORDER_SERVICE_URL = `${process.env.REACT_APP_ORDER_SERVICE_URL}`;

export async function loadUserData() {
  try {
    const response = await axios.get(USER_SERVICE_URL, {
      headers: {
        authorization: `BEARER ${sessionStorage["token"]}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsersByIds(ids) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_USER_SERVICE_URL}/public/users?ids=${ids}`,
      {
        headers: {
          authorization: `BEARER ${sessionStorage["token"]}`,
        },
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addAddress(address) {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/address`, address, {
      headers: {
        authorization: `BEARER ${sessionStorage["token"]}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editAddress(currentAddress) {
  try {
    const {
      addressLabel,
      flatNo,
      buildingName,
      locality,
      area,
      city,
      district,
      state,
      country,
      pincode,
    } = currentAddress;

    const response = await axios.patch(
      `${USER_SERVICE_URL}/address/${currentAddress.addressId}`,
      {
        addressLabel,
        flatNo,
        buildingName,
        locality,
        area,
        city,
        district,
        state,
        country,
        pincode,
      },
      {
        headers: {
          authorization: `BEARER ${sessionStorage["token"]}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserData(formData) {
  try {
    const response = await axios.patch(USER_SERVICE_URL, formData, {
      headers: {
        authorization: `BEARER ${sessionStorage["token"]}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteAddress(addressId) {
  try {
    const response = await axios.delete(
      `${USER_SERVICE_URL}/address/${addressId}`,
      {
        headers: {
          authorization: `BEARER ${sessionStorage["token"]}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function setDefaultAddress(addressId) {
  try {
    const response = await axios.patch(
      `${USER_SERVICE_URL}/address/${addressId}/set-default`,
      {},
      {
        headers: {
          authorization: `BEARER ${sessionStorage["token"]}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getReviews() {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/reviews/customer`, {
      headers: {
        Authorization: `Bearer ${sessionStorage["token"]}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteReview(bookId, reviewId) {
  try {
    const response = await axios.delete(
      `${BOOK_SERVICE_URL}/reviews/customer/book/${bookId}/review/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage["token"]}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const response = await axios.get(`${ORDER_SERVICE_URL}/orders/list`, {
      headers: {
        Authorization: `Bearer ${sessionStorage["token"]}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
