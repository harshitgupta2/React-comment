import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [sortType, setSortType] = useState("newest");

  //  Add new comment or reply
  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      score: 0,
      time: new Date(),
      replies: [],
    };

    if (parentId === null) {
      setComments([newComment, ...comments]);
    } else {
      const updated = comments.map((c) =>
        c.id === parentId
          ? { ...c, replies: [newComment, ...c.replies] }
          : { ...c, replies: updateReplies(c.replies, parentId, newComment) }
      );
      setComments(updated);
    }
  };

  //  Recursive reply updater
  const updateReplies = (replies, parentId, newComment) =>
    replies.map((r) =>
      r.id === parentId
        ? { ...r, replies: [newComment, ...r.replies] }
        : { ...r, replies: updateReplies(r.replies, parentId, newComment) }
    );

  //  Voting logic
  const vote = (id, delta) => {
    const update = (list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, score: c.score + delta }
          : { ...c, replies: update(c.replies) }
      );
    setComments(update(comments));
  };

  //  Sorting logic
  const sortComments = (list) => {
    let sorted = [...list];
    switch (sortType) {
      case "newest":
        sorted.sort((a, b) => b.time - a.time);
        break;
      case "oldest":
        sorted.sort((a, b) => a.time - b.time);
        break;
      case "highest":
        sorted.sort((a, b) => b.score - a.score);
        break;
      case "lowest":
        sorted.sort((a, b) => a.score - b.score);
        break;
      default:
        break;
    }
    return sorted;
  };

  return (
    <div>
      {/* New Comment Form */}
      <CommentForm onSubmit={(text) => addComment(text)} />

      {/* Sort Dropdown */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <h2 className="font-semibold text-gray-700">Comments</h2>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border rounded-md p-1 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
        </select>
      </div>

      {/* Comment List */}
      <div>
        {sortComments(comments).map((c) => (
          <Comment
            key={c.id}
            comment={c}
            onReply={addComment}
            onVote={vote}
            sortType={sortType}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
