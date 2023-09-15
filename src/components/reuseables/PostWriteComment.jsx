import { useState } from "react";
import PropTypes from "prop-types";

const PostWriteComment = ({ catchId, insertNewComment }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    insertNewComment(catchId, comment);
    setComment("");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kommentoi saalista</h2>
      <div className="flex">
        <textarea
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Kirjoita kommentti..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-r-md ${
            !comment ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={!comment}
        >
          Lähetä
        </button>
      </div>
    </div>
  );
};

PostWriteComment.propTypes = {
  catchId: PropTypes. number,
  insertNewComment: PropTypes.func,
};

export default PostWriteComment;
