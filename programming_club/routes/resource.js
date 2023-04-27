const express = require('express');
const router = express.Router();
const recourseController = require('../controllers/resourceController');
const ensureAuthenticated=require('../config/auth.js').ensureAuthenticated;


// router.get("/:id",recourseController.Resource_get);
router.get("/",ensureAuthenticated,recourseController.Resource_get_all);
// router.put("/:id",recourseController.Resource_put);
// router.delete("/",recourseController.Resource_delete);
module.exports = router;