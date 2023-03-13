const { Thoughts, Users } = require("../models");

const thoughtsController = {
  makeThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          return res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  getAllThoughts(req, res) {
    Thoughts.find({})
      //   .populate({ path: "reactions", select: "-__v" })
      //   .select("-__v")
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      //   .populate({ path: "reactions", select: "-__v" })
      //   .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
        }
      });
  },
};
