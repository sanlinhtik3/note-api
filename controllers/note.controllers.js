const noteModels = require("../models/note.models");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async(req, res) => {
  const { id } = req.query;

  if(id) {
    const note = await noteModels.findById(id);
    return res.status(200).json(note);
  }

  const notes = await noteModels.find()
  return res.status(200).json(notes);
});

const createNote = asyncHandler(async(req, res) => {
  const { title } = req.body;

  if(!title) {
    res.status(401)
    throw new Error("Please fill all field")
  }

  const note = await noteModels.create(req.body)
  return res.status(200).json(note);
});

const updateNote = asyncHandler(async(req, res) => {
    const { id } = req.params

    if (!id) {
      res.status(401);
      throw new Error("ID note found");
    }

    const updatedNote = await noteModels.findByIdAndUpdate(id, req.body, {new: true})
  return res.status(200).json(updatedNote);
});

const deleteNote = asyncHandler(async(req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(401);
      throw new Error("ID note found");
    }
    const deletedNote = await noteModels.findByIdAndDelete(id)

  return res.json(deletedNote);
});

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}