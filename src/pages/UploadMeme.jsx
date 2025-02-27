import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../firebase/firebase.config"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const UploadMeme = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to upload image to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const API_KEY = import.meta.env.VITE_IMGBB_API_KEY; // Ensure you have this in your .env file
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.success ? data.data.url : null;
  };

  // Function to generate AI-based captions using Hugging Face API
  const generateAICaption = async () => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_HUGGING_FACE_API_KEY
            }`, // Ensure you have this in your .env file
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: "Generate a funny meme caption." }),
        }
      );

      const data = await response.json();
      setCaption(data.generated_text || "Funny meme!");
    } catch (error) {
      console.error("Failed to generate AI caption:", error);
      toast.error("AI Caption generation failed!");
    }
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  // Handle Meme Upload & Store in Firestore
  const handleUpload = async () => {
    if (!file || !caption)
      return toast.error("Please upload an image and add a caption.");

    setLoading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      if (!imageUrl) throw new Error("ImgBB upload failed!");

      // Store meme data in Firestore
      await addDoc(collection(db, "memes"), {
        imageUrl,
        caption,
        createdAt: serverTimestamp(),
      });

      toast.success("Meme uploaded successfully!");

      // Reset state after upload
      setFile(null);
      setCaption("");
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload meme.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-500 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Your Meme</h2>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*,video/gif"
        onChange={handleFileChange}
        className="mb-4 w-full border p-2 rounded"
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-auto rounded mb-4"
        />
      )}

      {/* Caption Editor */}
      <ReactQuill
        value={caption}
        onChange={setCaption}
        placeholder="Enter a funny caption..."
        className="mb-4"
      />

      {/* AI Caption Generator */}
      <button
        onClick={generateAICaption}
        className="btn btn-secondary w-full mb-2"
        disabled={loading}
      >
        Generate AI Caption
      </button>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Meme"}
      </button>
      <Toaster />
    </div>
  );
};

export default UploadMeme;
