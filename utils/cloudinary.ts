
import Axios from 'axios';
const CLOUD_NAME: string = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string;
const IMAGE_UPLOAD_URL: string = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL as string;
const UPLOAD_PRESENT: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT as string;

export const uploadImageCloudinary = (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("cloud_name", CLOUD_NAME);
  data.append("upload_preset", UPLOAD_PRESENT);
  return Axios.post('https://api.cloudinary.com/v1_1/akashui/image/upload',data).then((res)=>res?.data?.url);
};

export const uploadNewImage = async (imageData: any) => {
  if (imageData) {
    return await uploadImageCloudinary(imageData);
  } 
//   else {
//     return Promise.resolve(imageData);
//   }
};
