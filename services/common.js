// import axios from 'axios';
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;



// export const uploadFile = async (file) => {
//     const Project_id = (localStorage.getItem("projectId"))
//     try {
//         const response = await axios.post(`${BASE_URL}/attachment/upload`, file);
//         return response.data;
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         throw error;
//     }
// };



import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/attachment/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
