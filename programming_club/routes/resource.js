const express = require('express');
const router = express.Router();
const recourseController = require('../controllers/resourceController');



// router.get("/:id",recourseController.Resource_get);
router.get("/",recourseController.Resource_get_all);
router.post("/",recourseController.Resource_post);
// router.put("/:id",recourseController.Resource_put);
// router.delete("/",recourseController.Resource_delete);
module.exports = router;