"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(require("./profile.sql"));
const typedi_1 = require("typedi");
require("reflect-metadata");
let ProfileRepository = class ProfileRepository {
    get_by_id(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [profile_data] = yield conn.query(sql.GET_USER_ID, user_id);
            return profile_data;
        });
    }
    save_follow(conn, user_id, follow_user_id, follow_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follow_save] = yield conn.query(sql.SAVE_FOLLOW, [
                follow_user_id,
                user_id,
                follow_status,
            ]);
            return follow_save;
        });
    }
    get_follow(conn, user_id, follow_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follow_check] = yield conn.query(sql.GET_FOLOW_USER, [follow_user_id, user_id]);
            return follow_check;
        });
    }
    update_follow(conn, user_id, follow_user_id, follow_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follow_update] = yield conn.query(sql.UPDATE_FOLLOW, [
                follow_status,
                follow_user_id,
                user_id,
            ]);
            return follow_update;
        });
    }
    // 팔로워 개수
    get_follower_count(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follower_count] = yield conn.query(sql.GET_FOLLOWER_COUNT, user_id);
            return follower_count;
        });
    }
    // 팔로잉 개수
    get_following_count(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [following_count] = yield conn.query(sql.GET_FOLLOWING_COUNT, user_id);
            return following_count;
        });
    }
    // 게시글 개수
    get_board_count(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [board_count] = yield conn.query(sql.GET_BOARD_COUNT, user_id);
            return board_count;
        });
    }
    // 프로필 피드 가져오기
    get_feed(conn, user_id, last_board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [feed_data] = yield conn.query(sql.GET_FEED, [user_id, last_board_id]);
            return feed_data;
        });
    }
    // 팔로우한 사람들 피드
    get_follow_feed(conn, user_id, last_board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follow_feed_data] = yield conn.query(sql.GET_ALL_FEED_FOLLOW, [user_id, last_board_id]);
            return follow_feed_data;
        });
    }
    // 피드 이미지 불러오기
    get_follow_feed_img(conn, img_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [follow_feed_data] = yield conn.query(sql.GET_BOARD_IMG, img_info);
            return follow_feed_data;
        });
    }
    update_user_profile(conn, user_profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_user_profile] = yield conn.query(sql.UPDATE_USER_PROFILE, user_profile);
            return res_user_profile;
        });
    }
    get_follow_sub_list_private(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_follow_list] = yield conn.query(sql.GET_FOLLOW_SUB_LIST_PRIVATE, user_id);
            return res_follow_list;
        });
    }
    // 팔로우 상태 체크
    get_follow_status(conn, user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_follow_status] = yield conn.query(sql.GET_CHECK_FOLLOW_STATUS, user_info);
            return res_follow_status;
        });
    }
};
ProfileRepository = __decorate([
    (0, typedi_1.Service)()
], ProfileRepository);
exports.default = ProfileRepository;
//# sourceMappingURL=profile.dao.js.map