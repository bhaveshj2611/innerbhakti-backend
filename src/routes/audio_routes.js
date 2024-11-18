const express = require("express");
const router = express.Router();
const Program = require("../models/program");


router.get("/audio", async (req, res) => {
  try {
    const { programId, trackTitle } = req.query;

    if (!programId || !trackTitle) {
      return res
        .status(400)
        .json({ message: "programId and trackTitle are required" });
    }

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }


    const track = program.tracks.find((t) => t.title === trackTitle);

    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }


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
