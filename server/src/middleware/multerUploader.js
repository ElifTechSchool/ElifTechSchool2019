import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png'],
});

const multerUploader = multer({ storage }).single('image');

export default multerUploader;
