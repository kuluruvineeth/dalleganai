import axios from "../utils/axios";

const generateImage = async (data: { prompt: string; size: string }) => {
  try {
    const response = await axios.post("/image/generate", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchImages = (page: number, limit = 8) => {
  return axios
    .get(`/image/all?page=${page}&limit=${limit}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const imageService = {
  generateImage,
  fetchImages,
};

export default imageService;
