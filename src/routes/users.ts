import { Router } from 'express';
import {
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/users';
import { validateUserdId, validateUpdateAvatar, validateUpdateProfile } from '../validation/user';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserdId, getUserById);
router.patch('/me', validateUpdateProfile, updateUserProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

export default router;
