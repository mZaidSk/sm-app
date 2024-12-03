import './ProfileHeader.css'; 

const ProfileHeader= () => {
  const data = {
    userName: "lathikakotian03",
    noOfPost: 0,
    noOfFollowers: 12,
    noOfFollowing: 29,
    bio: 'i want to be a ....'
  }


    return (
        <div className="profile-content">
        <div className="profile-header">
          {/* Profile Picture */}
          <div className="profile-picture">
            <div className="profile-img-placeholder">
              <img src="#" alt="Profile" />
            </div>
          </div>

          {/* User Info */}
          <div className="profile-info">
            <div className="username-section">
              <h2>{data.userName}</h2>
              <button>Edit Profile</button>
              {/* <button>View Archive</button> */}
              <button className="settings-btn">&#9881;</  button>
            </div>

            <div className="stats">
              <span><strong>{data.noOfPost}</strong> posts</span>
              <span><strong>{data.noOfFollowers}</strong> followers</span>
              <span><strong>{data.noOfFollowing}</strong> following</span>
            </div>

            <div className="bio">
              <p>{data.bio}</p>
            </div>
          </div>
        </div>
        
        {/* 
     
        <div className="profile-tabs">
          <span>Posts</span>
          <span>Saved</span>
          <span>Tagged</span>
        </div>
        
        
        <div className="profile-body">
          <h3>Share Photos</h3>
          <p>When you share photos, they will appear on your profile.</p>
        </div> 
        
        */}
      </div>
);
};

export default ProfileHeader;
