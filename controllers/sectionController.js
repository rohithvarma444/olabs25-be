const Section = require("../models/sectionModal");

const createSection = async (req, res) => {
    try {
        const { title } = req.body;
        const newSection = new Section({ title });
        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

const getAllSections = async (req, res) => {
    const sections = await Section.find().populate("subsections");
    res.json(sections);
};

const getSection = async (req, res) => {
    const section = await Section.findById(req.params.id).populate("subsections");
    if (!section) return res.status(404).json({ message: "Section not found." });
    res.json(section);
};

const updateSection = async (req, res) => {
    const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSection);
};

const deleteSection = async (req, res) => {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: "Section deleted." });
};

module.exports = { createSection, getAllSections, getSection, updateSection, deleteSection };