import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({ storage });

// Protect all routes
router.use(protect);

// Admin only routes
router.route('/')
  .get(authorize('admin'), getUsers);

router.route('/:id')
  .get(authorize('admin'), getUser)
  .put(upload.single('profileImage'), updateUser)
  .delete(authorize('admin'), deleteUser);

export default router; 