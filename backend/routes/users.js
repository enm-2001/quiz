const express = require('express');
const {createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, uploadAvatar} = require('../controllers/userController');
const { authenticateToken } = require('../auth/checkAuth');
const multer = require('multer')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/users', createUser);
router.post('/users/login', loginUser);
router.get('/users', authenticateToken, getAllUsers);
router.get('/users/:user_id',getUserById);
router.put('/users/:user_id',authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser)
router.post('/users/:user_id/avatar', upload.single('file'), uploadAvatar)

module.exports = router;