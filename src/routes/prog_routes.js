const express = require("express");
const Program = require("../models/program");

const router = express.Router();

// Get all programs
router.get("/programs", async (req, res) => {
  try {
    const programs = await Program.find({});
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error });
  }
});

// Get program details by ID
router.get("/program-details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findById(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Error fetching program details", error });
  }
});

module.exports = router;
