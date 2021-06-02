const mongoose = require('mongoose');
require('../db/models/Note');

const Note = mongoose.model('notes');

const note = {
  addNote: async (req, res) => {
    let newNote;
    const type = req.body.type;
    const title = req.body.title;
    const content = req.body.content;
    const articleUrl = req.body.articleUrl;
    const twitterName = req.body.twitterName;
    // const userID = req.body.userID;
    const userId = req.query.userId;
    console.log(userId);
    if (userId === 'null') {
      return res.status(403).json({ message: err.message });
    }
    try {
      newNote = new Note({
        type: type,
        title: title,
        content: content,
        articleUrl: articleUrl,
        twitterName: twitterName,
        userId: userId,
      });

      const result = await newNote.save();
      console.log(result);
      res.status(201).json(result);
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  },
  getAllNotes: (req, res) => {
    console.log(req.query.userID);
    // Note.find({ userID: req.query.userID })
    Note.find()
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getAllNotesOfOneType: (req, res) => {
    console.log(req.query.type);
    const userId = req.query.userId;
    console.log(userId);
    if (userId === 'null') {
      return res.status(403).json({ message: err.message });
    }
    Note.find({ type: req.query.type, userId: userId })
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getSingleNote: (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    if (userId === 'null') {
      return res.status(403).json({ message: err.message });
    }

    Note.findById(req.params.id)
      .then((results) => {
        if (!results) {
          res.send(404);
        } else {
          res.send(results);
        }
      })
      .catch((err) => res.sendStatus(404));
  },
  updateNote: (req, res) => {
    const updatedNoteContent = {
      type: req.body.type, // twitters, articles, simple
      title: req.body.title,
      content: req.body.content,
      articleUrl: req.body.articleUrl,
      twitterName: req.body.twitterName,
    };
    Note.findByIdAndUpdate(req.params.id, updatedNoteContent)
      .then((updatedNote) => res.send(updatedNote))
      .catch((err) => console.log(err));
  },
  deleteNote: (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    if (userId === 'null') {
      return res.status(403).json({ message: err.message });
    }
    Note.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (!result) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => res.sendStatus(500));
  },
};

module.exports = note;
