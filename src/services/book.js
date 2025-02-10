import axios from "axios";

const BOOK_SERVICE_URL = process.env.REACT_APP_BOOK_SERVICE_URL;

export async function getAllLabels() {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/book/admin/labels`, {
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

export async function getCatFromLabel(label) {
  try {
    const response = await axios.get(
      `${BOOK_SERVICE_URL}/book/admin/categories/${label.toUpperCase()}`,
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

export async function getSubCatFromLabelCat(label, cat) {
  try {
    const response = await axios.get(
      `${BOOK_SERVICE_URL}/book/admin/subCategories/${label.toUpperCase()}/${cat}`,
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

export async function addBook(formData) {
  try {
    const { title, isbn, description, image, category, subCategory } = formData;

    const payload = {
      title,
      isbn,
      description,
      image,
    };

    const labels = formData.lable.toUpperCase();
    payload.pageCount = parseInt(formData.pageCount);
    payload.price = parseFloat(formData.price); // Convert price to float
    payload.discount = parseFloat(formData.discount) || 0; // Convert discount to float, default to 0 if invalid
    payload.authorId = parseInt(formData.author);
    payload.publisherId = parseInt(formData.publisher);
    payload.publicationDate = formData.publicationDate;
    payload.language = formData.language.toUpperCase();
    payload.binding = formData.binding.toUpperCase();
    payload.totalAvailableCount = parseInt(formData.stock);
    payload.bookMappings = [{ labels, category, subCategory }];
    payload.available = true;

    console.log(payload);

    const response = await axios.post(
      `${BOOK_SERVICE_URL}/book/admin/add`,
      payload,
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

export async function getFeaturedBooks() {
  const featuredBookIds = [1, 2, 3, 4, 6, 8, 9, 11];

  try {
    const bookPromises = featuredBookIds.map((id) => getBookById(id));
    const books = await Promise.all(bookPromises);
    return books;
  } catch (error) {
    console.error("Error fetching featured books:", error);
    throw error;
  }
}
