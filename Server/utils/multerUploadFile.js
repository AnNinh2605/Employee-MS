import multer from 'multer';
const uploadFile = multer({ dest: 'Public/UploadData' });

export default uploadFile;