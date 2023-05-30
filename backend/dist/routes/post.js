"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const validation_middleware_1 = require("../middleware/validation-middleware");
const express_validator_1 = require("express-validator");
const post_1 = require("../controllers/post");
const router = (0, express_1.Router)();
router.post('/create-post', [(0, express_validator_1.body)('content', 'Content must be provided').isString().not().isEmpty()], isAuth_1.isAuth, validation_middleware_1.validationMiddleware, post_1.createPost);
router.get('/get-post/:userId', isAuth_1.isAuth, post_1.getPosts);
router.get('/get-new-feeds', isAuth_1.isAuth, post_1.getNewFeeds);
exports.default = router;