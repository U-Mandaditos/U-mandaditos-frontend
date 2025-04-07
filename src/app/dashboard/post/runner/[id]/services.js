import { API_URL } from "@/app/utils/settings";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const fetchPost = async (token, id, router) => {
  try {
    const res = await fetchWithAuth(
      `${API_URL}/api/mandadito/post/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      router
    );

    if (!res.success) throw new Error("Error fetching post: " + res.message);

    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRating = async (token, body, router) => {
  try {
    const res = await fetchWithAuth(
      `${API_URL}/api/ratings/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      router
    );

    if(!res.success) throw new Error("Error creating rating: " + res.message);

    return true;
  } catch (error) {
    throw error;
  }
};

const markPostAsCompleted = async (token, postId, router) => {
  try {
    const res = await fetchWithAuth(
      `${API_URL}/api/posts/${postId}/completed`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      router
    );

    if (!res.success) throw new Error("Error fetching post: " + res.message);

    return res.success;
  } catch (error) {
    throw error;
  }
};

export { createRating, markPostAsCompleted, fetchPost };