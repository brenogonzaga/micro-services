interface Comment {
  id: string;
  content: string;
}

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  const renderedComments = comments.map((comment: Comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
