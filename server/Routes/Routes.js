const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Note.find();
    //console.log("notes in backend" + [notes]);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured !");
  }
});

// router.get("/fetchsome", async (req, res) => {
//   try {
//     const notes = await Note.find();
//     //console.log("notes in backend" + [notes]);
//     res.json(notes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Some error occured !");
//   }
// });

router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Enter a description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      // if there are errors return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
      });
      const savedNote = await note.save();
      if (savedNote) {
        res.json(savedNote);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error !");
    }
  }
);

router.put("/updatenote/:id", async (req, res) => {
  const { title, description } = req.body;
  // create a newNote object
  const newNote = {};
  // console.log(title, description);

  // checking whether to change or not
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json("updated successfully");
});

router.delete("/deletenote/:id", async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured !");
  }
});

// search todo
router.get("/search/:query", async (req, res) => {
  const keyword = req.params.query;

  // const notes = await Note.find();
  // //console.log("notes in backend" + [notes]);
  // res.json(notes);
  try {
    const todos = await Note.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while searching data." });
  }
});

module.exports = router;
