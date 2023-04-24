const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/note.controllers');

const router = require('express').Router()

router.get("/", getNotes);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;
