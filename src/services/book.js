import axios from "axios";

const BOOK_SERVICE_URL = "http://192.168.0.106:8080";

export async function getBookById(id) {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/book/public/${id}`);
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
