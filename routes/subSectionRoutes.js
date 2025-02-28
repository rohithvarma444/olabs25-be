const express = require("express");
const router = express.Router();
const { createSubSection, getSubSection, getProcedure, getResources, deleteSubSection } = require("../controllers/subSectionController");
const { authenticateUser } = require("../middlewares/auth");

router.post("/create/:sectionId", authenticateUser, createSubSection);
router.get("/:id", getSubSection);
router.get("/:id/procedure", getProcedure);
router.get("/:id/resources", getResources);
router.delete("/:id", authenticateUser, deleteSubSection);

module.exports = router;