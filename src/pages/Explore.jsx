import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeMemeCard from "../components/HomeMemeCard";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("likes");
  const [filterType, setFilterType] = useState("Trending");
  const [currentPage, setCurrentPage] = useState(1);
  const memesPerPage = 6;

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMemes(data.data.memes.map(meme => ({ ...meme, likes: Math.floor(Math.random() * 1000), comments: Math.floor(Math.random() * 500), date: Date.now() - Math.floor(Math.random() * 100000000) })));
          setFilteredMemes(data.data.memes);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedMemes = [...memes];

    if (searchTerm) {
      updatedMemes = updatedMemes.filter((meme) =>
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortType) {
      case "likes":
        updatedMemes = updatedMemes.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        updatedMemes = updatedMemes.sort((a, b) => b.date - a.date);
        break;
      case "comments":
        updatedMemes = updatedMemes.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }

    if (filterType === "Trending") {
      updatedMemes = updatedMemes.slice(0, 10);
    } else if (filterType === "New") {
      updatedMemes = updatedMemes.reverse();
    } else if (filterType === "Classic") {
      updatedMemes = updatedMemes.slice(0, 20);
    } else if (filterType === "Random") {
      updatedMemes = updatedMemes.sort(() => 0.5 - Math.random());
    }

    setFilteredMemes(updatedMemes);
  }, [searchTerm, sortType, filterType, memes]);

  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = filteredMemes.slice(indexOfFirstMeme, indexOfLastMeme);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-6">
      <motion.h2 className="text-3xl font-bold text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Explore All Memes
      </motion.h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input type="text" placeholder="Search memes..." className="input input-bordered w-full md:w-1/3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="select select-bordered w-full md:w-1/5" value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="likes">Sort by Likes</option>
          <option value="date">Sort by Date</option>
          <option value="comments">Sort by Comments</option>
        </select>
        <select className="select select-bordered w-full md:w-1/5" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Classic">Classic</option>
          <option value="Random">Random</option>
        </select>
      </div>

      {loading ? (
        <motion.p className="text-center text-lg font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>
          Loading...
        </motion.p>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentMemes.map((meme, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <HomeMemeCard meme={meme} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(filteredMemes.length / memesPerPage)).keys()].map((num) => (
          <button key={num} onClick={() => paginate(num + 1)} className={`btn mx-1 ${currentPage === num + 1 ? "btn-primary" : "btn-secondary"}`}>
            {num + 1}
          </button>
        ))}
      </div>

      <motion.div className="text-center my-3">
        <Link to="/explore" className="btn bg-gradient-to-bl from-purple-600 to-cyan-600 hover:bg-gradient-to-bl hover:from-cyan-600 hover:to-purple-600 hover:animate-pulse">
          Find More Memes
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Explore;
