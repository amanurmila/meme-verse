/* eslint-disable react/prop-types */
import { FaCommentAlt, FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";

const FancyMemeCard = ({ meme }) => {
  return (
    <div className="card w-full sm:w-80 bg-base-100 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full h-56 object-cover"
        />
        {/* Overlay with Gradient & Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
          <h2 className="text-white font-bold text-lg">{meme.name}</h2>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-2">
            <FaCommentAlt className="text-blue-500" />
            <span className="font-medium">
              {meme.captions.toLocaleString()} Captions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaThLarge className="text-green-500" />
            <span className="font-medium">{meme.box_count} Boxes</span>
          </div>
        </div>
        <Link
          to={`/memeDetails/${meme.id}`}
          className="btn bg-cyan-600 w-full"
        >
          Meme Details
        </Link>
      </div>
    </div>
  );
};

export default FancyMemeCard;
