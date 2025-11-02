import  { useState } from "react";
import CommentForm from "./CommentForm";
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";

const Comment = ({ comment, onReply, onVote, sortType }) => {
  const [replying, setReplying] = useState(false);

  // Sort replies according to selected type
  const sortedReplies = [...comment.replies];
  if (sortType === "newest") sortedReplies.sort((a, b) => b.time - a.time);
  if (sortType === "oldest") sortedReplies.sort((a, b) => a.time - b.time);
  if (sortType === "highest") sortedReplies.sort((a, b) => b.score - a.score);
  if (sortType === "lowest") sortedReplies.sort((a, b) => a.score - b.score);

  return (
    <div className="border-l-2 border-gray-200 pl-4 mt-4">
      <div className="flex items-start gap-3">
        {/* Upvote / Downvote */}
        <div className="flex flex-col items-center">
          <button onClick={() => onVote(comment.id, 1)} className="text-green-600">
            <ArrowUp size={18} />
          </button>
          <span className="font-semibold text-gray-700">{comment.score}</span>
          <button onClick={() => onVote(comment.id, -1)} className="text-red-600">
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Comment Content */}
        <div className="flex-1 bg-gray-50 rounded-xl p-3 shadow-sm">
          <p className="text-gray-800">{comment.text}</p>
          <div className="text-xs text-gray-500 mt-1">
            {comment.time.toLocaleString()}
          </div>

          {/* Reply Button */}
          <button
            onClick={() => setReplying(!replying)}
            className="flex items-center text-sm text-blue-600 mt-2 hover:underline"
          >
            <MessageCircle size={14} className="mr-1" /> Reply
          </button>

          {/* Reply Form */}
          {replying && (
            <div className="ml-6 mt-2">
              <CommentForm
                onSubmit={(text) => {
                  onReply(text, comment.id);
                  setReplying(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies (Nested Comments) */}
      {sortedReplies.length > 0 && (
        <div className="ml-6">
          {sortedReplies.map((r) => (
            <Comment
              key={r.id}
              comment={r}
              onReply={onReply}
              onVote={onVote}
              sortType={sortType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
