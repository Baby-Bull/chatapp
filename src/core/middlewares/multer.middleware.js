const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// to-do modify this function,
// changing arguments for many types of files to be uploaded
const uploadFile = async () => {
    upload.single("file");
}

module.exports = {
    uploadFile
}