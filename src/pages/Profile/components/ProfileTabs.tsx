import React, { useState } from "react";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* Tab List */}
      <div className="flex justify-around border-b">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 text-center ${
            activeTab === "posts" ? "font-bold border-b-2 border-black" : "text-gray-600"
          }`}
        >
          POSTS
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 text-center ${
            activeTab === "saved" ? "font-bold border-b-2 border-black" : "text-gray-600"
          }`}
        >
          SAVED
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={`px-4 py-2 text-center ${
            activeTab === "tagged" ? "font-bold border-b-2 border-black" : "text-gray-600"
          }`}
        >
          TAGGED
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4">
        {activeTab === "posts" && (
          <div className="text-center my-10">
            <div className="my-4">
              <img
                src="src/assets/img/camera.png"
                alt="Camera"
                className="mx-auto w-24 h-24"
              />
            </div>
            <h3 className="text-xl font-bold">Share Photos</h3>
            <p className="text-sm text-gray-600">
              When you share photos, they will appear on your profile.
            </p>
            
          </div>
        )}

        {activeTab === "saved" && (
          <p className="text-center text-gray-600">No saved posts yet.</p>
        )}

        {activeTab === "tagged" && (
          <p className="text-center text-gray-600">No tagged posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
