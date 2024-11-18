const express = require("express");
const Program = require("../models/program");
const router = express.Router();

// Get a specific track by Program ID and Track Title
router.get("/audio/:programId/:trackId", async (req, res) => {
  try {
    const { programId, trackId } = req.params;

    // Find the program
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Find the track
    const track = program.tracks.find((t) => t._id.toString() === trackId);
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    // Return track details
    res.json({
      title: track.title,
      audioUrl: track.audioUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
