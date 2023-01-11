import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CommentList from "../components/CommentList";
import formatDateNatural from "../utils/formatDateNatural";

function CommentInput({ ticket }) {
  const textRef = useRef(null);
  const navigate = useNavigate();
  const parentRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      ticketId: ticket._id,
      text: textRef.current.value,
    };
    if (parentRef.current.value) {
      body.parentId = parentRef.current.value;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/comments/new`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    navigate(0); // Refresh the page
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <input type="text" ref={parentRef} className="border" />
          <textarea
            ref={textRef}
            rows={4}
            cols={50}
            className="border p-2"
          ></textarea>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, isLoadingTicket, projError] = useFetch(
    `/api/tickets/${ticketId}`
  );
  const [comments, isLoadingComments, commentsErr] = useFetch(
    `/api/comments/byTicket/${ticketId}`
  );
  const commentDialog = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [commentParentId, setCommentParentId] = useState(null);
  const navigate = useNavigate();

  const handleCommentSubmit = async () => {
    if (commentDialog.current.returnValue !== "cancel") {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/new`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId: commentParentId,
            ticketId: ticketId,
            text: commentText,
          }),
        }
      );
      console.log(JSON.stringify(await response.json()));
      navigate(0);
    }
  };

  if (projError) {
    return navigate("/tickets");
  }

  if (isLoadingTicket || isLoadingComments) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-zinc-700">{ticket.projectId.name}</p>
        <div>
          <h1 className="text-2xl font-bold">{ticket.title}</h1>
        </div>
      </div>
      <div className="pb-4 mb-4 border-b">
        <pre className="font-sans">{ticket.description}</pre>
      </div>
      <div className="flex gap-12 mb-4 pb-4">
        <div>
          <p className="text-sm font-medium text-zinc-700">Severity</p>
          <p className="text-lg flex gap-1">{ticket.severity}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-700">Status</p>
          <p className="text-lg flex gap-1">{ticket.status}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-700">Submitted by</p>
          <p className="text-lg">
            {ticket.reporterId.firstName} {ticket.reporterId.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-700">Date Posted</p>
          <p className="text-lg flex gap-1">
            <span>
              {formatDateNatural(new Date(ticket.dateSubmitted))}
              {", "}
            </span>
            <span className="mr">
              {new Date(ticket.dateSubmitted).toDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <h2>Developers assigned to this ticket</h2>
        <div className="p-4 italic text-zinc-700">
          <p className="text-center">
            No developers are currently assigned to this ticket
          </p>
        </div>
      </div>
      <dialog ref={commentDialog} onClose={handleCommentSubmit}>
        <h1 className="font-bold">
          {commentParentId ? "Reply to a comment" : "Post a new comment"}
        </h1>
        <textarea
          rows="3"
          cols="50"
          className="border p-4"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        ></textarea>
        <form method="dialog">
          <div className="px-4 flex justify-end gap-4">
            <button
              value="default"
              className="bg-zinc-800 text-zinc-50 hover:bg-indigo-800 hover:text-zinc-50 border px-4 py-2"
            >
              Submit
            </button>
            <button
              value="cancel"
              className="bg-zinc-800 text-zinc-50 hover:bg-indigo-800 hover:text-zinc-50 border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end border-b pb-4">
          <h2 className="text-xl font-bold">Discussion</h2>
          <button
            className="btn-primary"
            onClick={() => {
              setCommentParentId(null);
              commentDialog.current.showModal();
            }}
          >
            Post a comment
          </button>
        </div>
        {comments && comments.length !== 0 ? (
          <CommentList
            comments={comments}
            onClickReply={(parentId) => {
              setCommentParentId(parentId);
              commentDialog.current.showModal();
            }}
          />
        ) : (
          <div className="bg-zinc-50 text-zinc-800 p-4 text-center italic">
            No one has commented on this bug report.
          </div>
        )}
      </div>
    </>
  );
}
