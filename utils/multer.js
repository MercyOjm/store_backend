import multer from 'multer';

//setup storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        const [fileName, fileExtension] = file.originalname.split('.');
        req.fileName = fileName + "_" + Date.now() + "." + fileExtension;
        cb(null, req.fileName)
    }
});


export const upload = multer({storage: storage})