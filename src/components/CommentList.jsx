import formatDateNatural from "../utils/formatDateNatural";

export default function CommentList({ comments, onClickReply }) {
  return comments.map(({ comment, responses }) => (
    <div className={`${comment.parentId ? "pl-8 my-4" : ""}`} key={comment._id}>
      <div className="flex gap-2">
        <div className="text-zinc-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="bg-zinc-50 border w-full p-4">
          <p className="flex gap-1 mb-1">
            <span className="font-bold">
              {comment.authorId.firstName} {comment.authorId.lastName}
            </span>
            &bull;
            <span className="text-zinc-700">
              {formatDateNatural(new Date(comment.datePosted))}
            </span>
          </p>
          <pre className="font-sans">{comment.text}</pre>
          <div className="text-sm mt-2">
            <button
              className="hover:underline"
              onClick={() => onClickReply(comment._id)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {responses.length !== 0 && (
        <CommentList comments={responses} onClickReply={onClickReply} />
      )}
    </div>
  ));
}
