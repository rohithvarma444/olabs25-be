const SubSection = require("../models/subSectionModal");
const Section = require("../models/sectionModal");
const { extractKeywords } = require("../utils/keywordsGenerator");

// ✅ Create SubSection
const createSubSection = async (req, res) => {
    try {
        const { commonTitle, mediaURL, commonProcedureTitle, procedure, resources, quizId, content, exampleUsage } = req.body;
        const { sectionId } = req.params;

        if (!commonTitle || !commonProcedureTitle || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 🔹 Generate Keywords using the imported function
        const keywords = extractKeywords({ commonTitle, commonProcedureTitle, content, procedure, exampleUsage });

        const newSubSection = new SubSection({
            commonTitle,
            mediaURL,
            commonProcedureTitle,
            procedure,
            resources,
            quizId,
            content,
            exampleUsage,
            keywords
        });

        await newSubSection.save();

        // 🔹 Add subsection reference to the Section
        await Section.findByIdAndUpdate(sectionId, { $push: { subsections: newSubSection._id } });

        res.status(201).json(newSubSection);
    } catch (error) {
        console.error("Error creating subsection:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Get a Single SubSection
const getSubSection = async (req, res) => {
    try {
        const subSection = await SubSection.findById(req.params.id);
        if (!subSection) return res.status(404).json({ message: "SubSection not found." });

        res.json(subSection);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Get Procedure of a SubSection
const getProcedure = async (req, res) => {
    try {
        const subSection = await SubSection.findById(req.params.id);
        if (!subSection) return res.status(404).json({ message: "SubSection not found." });

        res.json({ title: subSection.commonProcedureTitle, procedure: subSection.procedure });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Get Resources of a SubSection
const getResources = async (req, res) => {
    try {
        const subSection = await SubSection.findById(req.params.id);
        if (!subSection) return res.status(404).json({ message: "SubSection not found." });

        res.json(subSection.resources);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// ✅ Delete SubSection and Remove from Section
const deleteSubSection = async (req, res) => {
    try {
        const { id } = req.params;

        const subSection = await SubSection.findById(id);
        if (!subSection) return res.status(404).json({ message: "SubSection not found." });

        // 🔹 Remove reference from the section
        await Section.updateMany({ subsections: id }, { $pull: { subsections: id } });

        // 🔹 Delete subsection
        await SubSection.findByIdAndDelete(id);

        res.json({ message: "SubSection deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

module.exports = { createSubSection, getSubSection, getProcedure, getResources, deleteSubSection };