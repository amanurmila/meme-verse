import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomeMemeCard from "./HomeMemeCard";
import {Link} from "react-router-dom"

const HomeMeme = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMemes(data.data.memes);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Trending Memes
      </motion.h2>

      {loading ? (
        <motion.p
          className="text-center text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading...
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {memes.slice(0, 9).map((meme, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <HomeMemeCard meme={meme} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <motion.div className="text-center my-3">
        <Link to="/explore" className="btn bg-gradient-to-bl from-purple-600 to-cyan-600 hover:bg-gradient-to-bl hover:from-cyan-600 hover:to-purple-600 hover:animate-pulse">
          Find More Memes
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HomeMeme;
