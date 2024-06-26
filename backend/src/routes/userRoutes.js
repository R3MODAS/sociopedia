import { Router } from "express";
const router = Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    resetPasswordToken,
    resetPassword,
    changePassword,
    getUserDetails,
    updateUserProfile,
    getAllUsers,
    getAUser,
    deleteAUser,
    updateUserRole,
} from "../controllers/userController.js";
import { auth, authorizeRoles } from "../middlewares/auth.js";

// Authentication routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/reset-password-token").post(resetPasswordToken);
router.route("/reset-password/:token").put(resetPassword);
router.route("/update-password").put(auth, changePassword);

// User routes
router.route("/me").get(auth, getUserDetails);
router.route("/me/update").put(auth, updateUserProfile);

// Admin routes
router.route("/admin/users").get(auth, authorizeRoles("admin"), getAllUsers);
router
    .route("/admin/user/:id")
    .get(auth, authorizeRoles("admin"), getAUser)
    .delete(auth, authorizeRoles("admin"), deleteAUser)
    .put(auth, authorizeRoles("admin"), updateUserRole);

export default router;
