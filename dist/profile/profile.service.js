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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
require("reflect-metadata");
// ???????????? ?????? ????????? ?????????
const db_1 = __importDefault(require("../config/db"));
const profile_dao_1 = __importDefault(require("./profile.dao"));
const Log = __importStar(require("../middlewares/adminlog/log.dao"));
const response_1 = require("../config/response");
const winston_1 = __importDefault(require("../config/winston"));
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// datamanager ?????? ????????? ?????????
// ??????????????? ??????????????? ??????
// ???????????? ????????? ??? ????????? ???????????????
// ???????????? ????????? ??????
// ?????? ?????? ?????? ??? ??????
let ProfileService = class ProfileService {
    constructor() {
        this.profileRepository = typedi_1.Container.get(profile_dao_1.default);
    }
    Get_profile(user_id, self_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_user = yield this.profileRepository.get_by_id(conn, user_id);
                if (check_user.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.USER_NOTHING);
                }
                const following = yield this.profileRepository.get_following_count(conn, user_id);
                const follower = yield this.profileRepository.get_follower_count(conn, user_id);
                const board_count = yield this.profileRepository.get_board_count(conn, user_id);
                const { user_name, name, profileUrl, website, introduction } = check_user[0];
                const user_status = check_user[0].user_status;
                // ????????? ?????? ?????? ??????
                if (check_user[0].user_status == 'PRIVATE') {
                    if (check_user[0].user_id != self_user_id) {
                        const check_follow_status = yield this.profileRepository.get_follow_status(conn, [
                            self_user_id,
                            user_id,
                        ]);
                        if (check_follow_status.length != 0) {
                            if (check_follow_status[0].follow_status != 'FOLLOW') {
                                return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                                    following_count: following[0].count,
                                    follower_count: follower[0].count,
                                    board_count: board_count[0].count,
                                    user_id,
                                    user_name,
                                    name,
                                    profileUrl,
                                    website,
                                    introduction,
                                    user_status,
                                });
                            }
                        }
                        else {
                            return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                                following_count: following[0].count,
                                follower_count: follower[0].count,
                                board_count: board_count[0].count,
                                user_id,
                                user_name,
                                name,
                                profileUrl,
                                website,
                                introduction,
                                user_status,
                            });
                        }
                    }
                }
                const user_post = yield this.profileRepository.get_feed(conn, user_id, 10000);
                yield conn.commit();
                yield Log.save_user_log(user_id, 'READ');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                    following_count: following[0].count,
                    follower_count: follower[0].count,
                    board_count: board_count[0].count,
                    user_status,
                    user_id,
                    user_name,
                    name,
                    profileUrl,
                    website,
                    introduction,
                    user_post,
                });
            }
            catch (err) {
                winston_1.default.error(`App - Get_porfile ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_follow(user_id, follow_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                let follow_status = 'FOLLOW';
                // ??????????????? ???????????? ????????? ?????? ??????
                const check_id = yield this.profileRepository.get_by_id(conn, follow_user_id);
                if (check_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.USER_NOTHING);
                }
                //????????? ??????
                const check_follow = yield this.profileRepository.get_follow(conn, user_id, follow_user_id);
                // ????????? ?????? ??????
                // ????????? ????????? ????????? ????????? ??????
                // ????????? ????????? ?????? ?????? ???????????? ??? ?????????
                // ????????? ?????? ????????? status??? FOLLOW??? ??????
                if (check_follow.length == 0) {
                    //   ????????? ???
                    if (check_id[0].user_status == 'PRIVATE') {
                        follow_status = 'SUBSCRIPTION';
                    }
                    yield this.profileRepository.save_follow(conn, user_id, follow_user_id, follow_status);
                }
                else {
                    if (check_id[0].user_status == 'PRIVATE') {
                        return (0, response_1.response)(baseResponse_1.default.FOLLOW_PRIVATE_ALREADY);
                    }
                    // ????????? ????????? ????????? ????????????
                    else {
                        yield this.profileRepository.update_follow(conn, user_id, follow_user_id, follow_status);
                    }
                }
                yield conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Save_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    // ????????? ??????
    Update_follow(user_id, follow_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                let follow_status = 'UNFOLLOW';
                // ??????????????? ???????????? ????????? ?????? ??????
                const check_id = yield this.profileRepository.get_by_id(conn, follow_user_id);
                if (check_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.USER_NOTHING);
                }
                //????????? ??????
                const check_follow = yield this.profileRepository.get_follow(conn, user_id, follow_user_id);
                // ????????? ?????? ??????
                // ????????? ????????? ????????? ????????? ??????
                // ????????? ????????? ?????? ?????? ???????????? ??? ?????????
                // ????????? ?????? ????????? status??? FOLLOW??? ??????
                if (check_follow.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.FOLLOW_NOTHING);
                }
                else {
                    yield this.profileRepository.update_follow(conn, user_id, follow_user_id, follow_status);
                }
                yield conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Update_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    // ????????? ?????? ????????? ??????
    Get_follow_sub_list(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const follow_list = yield this.profileRepository.get_follow_sub_list_private(conn, user_id);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, follow_list);
            }
            catch (err) {
                winston_1.default.error(`App - Get_follow_list ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_feed(user_id, last_board_id, self_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_user = yield this.profileRepository.get_by_id(conn, user_id);
                const res_Get_feed = yield this.profileRepository.get_feed(conn, user_id, last_board_id);
                if (check_user.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.USER_NOTHING);
                }
                if (check_user[0].user_status == 'PRIVATE') {
                    if (check_user[0].user_id != self_user_id) {
                        const check_follow_status = yield this.profileRepository.get_follow_status(conn, [
                            self_user_id,
                            user_id,
                        ]);
                        if (check_follow_status.length != 0) {
                            if (check_follow_status[0].follow_status != 'FOLLOW') {
                                return (0, response_1.response)(baseResponse_1.default.SUCCESS, res_Get_feed);
                            }
                            else {
                                return (0, response_1.response)(baseResponse_1.default.PRIVATE_USER);
                            }
                        }
                        else {
                            return (0, response_1.response)(baseResponse_1.default.PRIVATE_USER);
                        }
                    }
                }
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, res_Get_feed);
            }
            catch (err) {
                winston_1.default.error(`App - Get_feed ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_feed_follow(user_id, last_board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const board_data = yield this.profileRepository.get_follow_feed(conn, user_id, last_board_id);
                for (let board of board_data) {
                    const board_id = board.board_id;
                    const board_img = yield this.profileRepository.get_follow_feed_img(conn, board_id);
                    board.imgs = board_img;
                }
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, board_data);
            }
            catch (err) {
                winston_1.default.error(`App - Get_feed_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_user_profile(user_id, profileUrl, website, introduction) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const user_profile_info = [profileUrl, website, introduction, user_id];
                yield this.profileRepository.update_user_profile(conn, user_profile_info);
                yield conn.commit();
                yield Log.save_user_log(user_id, 'UPDATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Update_user_profile ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_follow_accept(user_id, follow_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.commit();
                const status = 'FOLLOW';
                const info = [status, user_id, follow_user_id];
                yield this.profileRepository.update_follow(conn, follow_user_id, user_id, status);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Save_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
};
ProfileService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ProfileService);
exports.default = ProfileService;
//# sourceMappingURL=profile.service.js.map