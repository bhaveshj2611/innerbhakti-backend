const express = require("express");
const router = express.Router();
const Program = require("../models/program");

// API to fetch audio track details with the program image
router.get("/audio", async (req, res) => {
  try {
    const { programId, trackTitle } = req.query;

    if (!programId || !trackTitle) {
      return res
        .status(400)
        .json({ message: "programId and trackTitle are required" });
    }

    // Find the program by programId
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Find the track by title
    const track = program.tracks.find((t) => t.title === trackTitle);

    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    // Return the track details and program image
    res.status(200).json({
      title: track.title,
      audioUrl: track.audioUrl,
      description: track.description,
      programImage: program.image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
