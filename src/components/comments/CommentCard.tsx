import { Comment } from "@/types/types";

interface CommentCardProps {
  comment: Comment
}

const CommentCard = ({comment}:CommentCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
      <div className="flex items-center mb-2">
        <div
        //   src="https://via.placeholder.com/40"
        //   alt="User Avatar"
          className="rounded-full bg-amber-300 mr-2"
        />
        <h3 className="text-lg font-semibold">
          {/* {typeof comment.author === "string" ? comment.author : comment.author.name} */}
        </h3>
      </div>
      <p className="text-gray-800 font-medium">{comment.title}</p>
      <p className="text-gray-600 mt-1">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
