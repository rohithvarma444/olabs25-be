const express = require("express");
const router = express.Router();
const { createSection, getAllSections, getSection, updateSection, deleteSection } = require("../controllers/sectionController");
const { authenticateUser } = require("../middlewares/auth");
const {extractKeywords} = require("../utils/keywordsGenerator");
const SubSection = require("../models/subSectionModal");
const Section = require("../models/sectionModal");



router.post("/create", authenticateUser, createSection);
router.get("/", getAllSections);
router.get("/:id", getSection);
router.put("/:id", authenticateUser, updateSection);
router.delete("/:id", authenticateUser, deleteSection);

router.post("/bulk", async (req, res) => {
    try {
        const sectionsData = req.body;

        if (!Array.isArray(sectionsData) || sectionsData.length === 0) {
            return res.status(400).json({ error: "Invalid or empty data provided" });
        }

        let insertedSections = [];

        for (const sectionData of sectionsData) {
            const { title, description, subsections } = sectionData;

            if (!Array.isArray(subsections) || subsections.length === 0) {
                return res.status(400).json({ error: "Invalid or missing subsections" });
            }

            for (const sub of subsections) {
                if (!sub.commonTitle || !sub.commonProcedureTitle || !sub.content) {
                    return res.status(400).json({ error: "Missing required fields in subsection" });
                }
                
                // Generate Keywords for the subsection
                sub.keywords = await extractKeywords(sub);
            }

            // Insert valid subsections
            const insertedSubsections = await SubSection.insertMany(subsections);
            const subsectionIds = insertedSubsections.map(sub => sub._id);

            // Create and save the section
            const newSection = new Section({
                title,
                description,
                subsections: subsectionIds
            });

            const savedSection = await newSection.save();
            insertedSections.push(savedSection);
        }

        res.status(201).json({ message: "Sections uploaded successfully", data: insertedSections });
    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;

