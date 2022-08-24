import axios from 'axios';

const UploadImageCloudinary = async (file) => {
    const data = new FormData();
    data.append('upload_preset', 'phoenix-talk-avatar');
    data.append('file', file);

    const CLOUD_NAME = 'stephenphyo';
    const RES_TYPE = 'image';
    const UPLOAD_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${RES_TYPE}/upload`;
    const res = await axios.post(UPLOAD_API, data);

    console.log(JSON.stringify(res))
};

export default UploadImageCloudinary;