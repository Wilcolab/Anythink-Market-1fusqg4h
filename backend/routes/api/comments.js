/**
 * Retrieves all comments.
 * @route GET /comments
 * @returns {object} - JSON object containing the comments.
 * @throws {Error} - If an error occurs while retrieving the comments.
 */

/**
 * Deletes a comment by its ID.
 * @route DELETE /comments/:id
 * @param {string} id - The ID of the comment to be deleted.
 * @returns {number} - HTTP status code 204 indicating successful deletion.
 * @throws {Error} - If an error occurs while deleting the comment.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
router.get("/comments", async (req, res, next) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.json({ comments });
});

// endpoint for deleting a comment
router.delete("/comments/:id", async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.sendStatus(404);
        }
        await comment.remove();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});