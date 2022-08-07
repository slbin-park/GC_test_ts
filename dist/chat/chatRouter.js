"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
require("../config/env");
const chat_controller_1 = __importDefault(require("./chat.controller"));
const router = express_1.default.Router();
router.post('/', jwt_1.default.check_access_token, chat_controller_1.default.save_chat);
router.get('/message', jwt_1.default.check_access_token, chat_controller_1.default.get_chat);
exports.default = router;
//# sourceMappingURL=chatRouter.js.map