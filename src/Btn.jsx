export default function Btn({ post }) {
  return (
    <>
      <button>
        <a href={post.html_url} target="blank">
          {post.name}
        </a>
      </button>
    </>
  );
}
