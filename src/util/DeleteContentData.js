import axios from 'axios';

const DeleteContentData = async (contentIdReturned) => {
  return await axios.delete(`/content/${contentIdReturned}`).catch((err) => {
    console.log(err);
  });
};

export default DeleteContentData;
