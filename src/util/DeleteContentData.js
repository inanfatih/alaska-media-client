import axios from 'axios';

const DeleteContentData = async (contentId) => {
  return await axios.delete(`/content/${contentId}`).catch((err) => {
    console.log(err);
  });
};

export default DeleteContentData;
