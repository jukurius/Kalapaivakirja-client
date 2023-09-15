import PropTypes from "prop-types";
import { IconQuestionMark } from "@tabler/icons-react";

const PostShowComments = ({ comments }) => {
  console.log(!comments.length);
  if (!comments.length) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Kommentit</h2>
        <p className="text-sm">Saalilla ei ole kommentteja</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kommentit</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              {comment?.image ? (
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={comment.image}
                  alt="Jese image"
                />
              ) : (
                <div className="bg-gray-200 rounded-full">
                  <IconQuestionMark size={40} />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="bg-gray-100 p-2 rounded-lg">
                <p className="text-gray-800">{comment.content}</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <span className="font-semibold">{comment.username}</span>{" "}
                <span>{comment.created}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostShowComments.propTypes = {
  comments: PropTypes.array,
};

export default PostShowComments;
