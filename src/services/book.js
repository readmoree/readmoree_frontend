import axios from "axios";

const BOOK_SERVICE_URL = "http://192.168.0.104:8080";

export async function getAllBooks() {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/book/public/all`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBookByCat(params) {
  try {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const response = await axios.get(
      `${BOOK_SERVICE_URL}/book/public/filter?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBookById(id) {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/book/public/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchBook(query) {
  try {
    const response = await axios.get(
      `${BOOK_SERVICE_URL}/book/public/search?searchKeyword=${query}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getReviewsByBook(id) {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/reviews/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addReview(id, review) {
  try {
    const response = await axios.post(
      `${BOOK_SERVICE_URL}/reviews/customer/book/${id}`,
      review,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage["token"]}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
