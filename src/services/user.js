import axios from "axios";

const USER_SERVICE_URL = "http://localhost:4000/user";

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
