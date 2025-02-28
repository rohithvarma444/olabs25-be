const SubSection = require("../models/subSectionModal");
const Section = require("../models/sectionModal");

const createSubSection = async (req, res) => {
    try {
        const { commonTitle, mediaURL, commonProcedureTitle, procedure, resources, quizId } = req.body;
        const { sectionId } = req.params;

        const newSubSection = new SubSection({
            commonTitle,
            mediaURL,
            commonProcedureTitle,
            procedure,
            resources,
            quizId
        });

        await newSubSection.save();
        await Section.findByIdAndUpdate(sectionId, { $push: { subsections: newSubSection._id } });

        res.status(201).json(newSubSection);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

const getSubSection = async (req, res) => {
    const subSection = await SubSection.findById(req.params.id);
    if (!subSection) return res.status(404).json({ message: "SubSection not found." });
    res.json(subSection);
};

const getProcedure = async (req, res) => {
    const subSection = await SubSection.findById(req.params.id);
    if (!subSection) return res.status(404).json({ message: "SubSection not found." });
    res.json({ title: subSection.commonProcedureTitle, procedure: subSection.procedure });
};

const getResources = async (req, res) => {
    const subSection = await SubSection.findById(req.params.id);
    if (!subSection) return res.status(404).json({ message: "SubSection not found." });
    res.json(subSection.resources);
};

const deleteSubSection = async (req, res) => {
    await SubSection.findByIdAndDelete(req.params.id);
    res.json({ message: "SubSection deleted." });
};

module.exports = { createSubSection, getSubSection, getProcedure, getResources, deleteSubSection };