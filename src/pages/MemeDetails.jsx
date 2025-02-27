import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMemes, setSimilarMemes] = useState([]);
  const [likes, setLikes] = useState(
    () => JSON.parse(localStorage.getItem(`likes-${id}`)) || 0
  );
  const [comments, setComments] = useState(
    () => JSON.parse(localStorage.getItem(`comments-${id}`)) || []
  );
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const foundMeme = data.data.memes.find((m) => m.id === id);
          setMeme(foundMeme);
          setSimilarMemes(data.data.memes.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meme:", error);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, JSON.stringify(newLikes));
  };

  const addComment = () => {
    if (commentInput.trim() === "") return;
    const newComments = [...comments, commentInput];
    setComments(newComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
    setCommentInput("");
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (!meme) {
    return (
      <div className="text-center text-xl font-semibold">Meme not found</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center mb-4">{meme.name}</h1>
      <motion.div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
        <img
          src={meme.url}
          alt={meme.name}
          className="rounded-lg w-full max-w-md"
        />
        <div className="flex justify-between w-full mt-4 px-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-600 transition hover:text-red-500"
          >
            <FaHeart
              className={`text-red-500 ${likes > 0 ? "animate-ping" : ""}`}
            />{" "}
            {likes} Likes
          </button>
          <span className="flex items-center gap-1 text-gray-600">
            <FaComment className="text-blue-500" /> {comments.length} Comments
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            📅 {new Date().toDateString()}
          </span>
        </div>
        <button className="mt-4 btn bg-gradient-to-bl from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
          <FaShareAlt /> Share Meme
        </button>
      </motion.div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <p key={index} className="border-b py-2">
              {comment}
            </p>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="input input-bordered w-full"
          />
          <button onClick={addComment} className="btn bg-blue-500 text-white">
            Post
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Similar Memes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {similarMemes.map((m) => (
          <Link
            key={m.id}
            to={`/meme/${m.id}`}
            className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={m.url}
              alt={m.name}
              className="rounded-md h-40 w-full object-cover"
            />
            <p className="text-sm mt-2 font-semibold">{m.name}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default MemeDetails;
