import multer from 'multer';
import path from 'path';

// multer setting for upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Images'); // path to save image
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

export default upload;