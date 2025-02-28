const express = require("express");
const router = express.Router();
const { createSection, getAllSections, getSection, updateSection, deleteSection } = require("../controllers/sectionController");
const { authenticateUser } = require("../middlewares/auth");

router.post("/create", authenticateUser, createSection);
router.get("/", getAllSections);
router.get("/:id", getSection);
router.put("/:id", authenticateUser, updateSection);
router.delete("/:id", authenticateUser, deleteSection);

module.exports = router;