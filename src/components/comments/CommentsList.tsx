import { Comment } from "@/types/types";
import CommentCard from "./CommentCard";

interface CommentsProps {
  comments: Comment[];
  comments_count: number;
}
const CommentsList = ({ comments, comments_count }: CommentsProps) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Комментарии ({comments_count}):
      </h3>
      <ul className="comments-list__items">
        {comments.map((comment, index) => (
          <li key={index} className="comments-list__item">
            <CommentCard comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
