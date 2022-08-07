"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("../user/userRouter"));
const authRouter_1 = __importDefault(require("../auth/authRouter"));
const boardRouter_1 = __importDefault(require("../board/boardRouter"));
const profileRouter_1 = __importDefault(require("../profile/profileRouter"));
const adminRouter_1 = __importDefault(require("../admin/adminRouter"));
const chatRouter_1 = __importDefault(require("../chat/chatRouter"));
const router = (0, express_1.default)();
router.use('/user', userRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/board', boardRouter_1.default);
router.use('/profile', profileRouter_1.default);
router.use('/admin', adminRouter_1.default);
router.use('/chat', chatRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map