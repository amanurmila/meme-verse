import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // Get user from context

  const [profile, setProfile] = useState({
    name: user?.displayName || localStorage.getItem("name") || "John Doe",
    bio: localStorage.getItem("bio") || "Meme Lover",
    profilePic:
      user?.photoURL ||
      localStorage.getItem("profilePic") ||
      "https://via.placeholder.com/150",
  });

  const [likedMemes, setLikedMemes] = useState([]);
  const [uploadedMemes, setUploadedMemes] = useState([]);

  // Load liked memes from local storage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedLikes);
  }, []);

  // Load uploaded memes (Replace this with Firebase fetch if needed)
  useEffect(() => {
    const fetchedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [
      {
        id: 1,
        url: "https://i.imgflip.com/1bij.jpg",
        caption: "One does not simply...",
      },
    ];
    setUploadedMemes(fetchedMemes);
  }, []);

  // Handle profile updates (for bio only, since name & pic come from AuthContext)
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: value };
      localStorage.setItem(name, value);
      return updatedProfile;
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-700 shadow-lg rounded-lg text-white">
      {/* Profile Section */}
      <div className="text-center">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full mb-3"
        />
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-gray-300">{user?.email}</p>

        {/* Bio Edit */}
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleProfileChange}
          placeholder="Edit your bio..."
          className="block mx-auto text-black p-2 rounded-md w-full my-2"
        />
      </div>

      {/* Uploaded Memes Section */}
      <h3 className="text-xl font-bold mt-6 mb-3">Your Uploaded Memes</h3>
      <div className="grid grid-cols-2 gap-4">
        {uploadedMemes.map((meme) => (
          <div key={meme.id} className="relative group">
            <img src={meme.url} alt="Meme" className="w-full rounded-md" />
            <p className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
              {meme.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Liked Memes Section */}
      <h3 className="text-xl font-bold mt-6 mb-3 flex items-center">
        <FaHeart className="text-red-500 mr-2" /> Liked Memes
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {likedMemes.length > 0 ? (
          likedMemes.map((meme, index) => (
            <img
              key={index}
              src={meme}
              alt="Liked Meme"
              className="w-full rounded-md"
            />
          ))
        ) : (
          <p>No liked memes yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
