import React, { useState } from 'react';
interface SuggestedUserCardProps {
  username: string;
  followers: string;
}

const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({ username, followers }) => (
  <div className="flex items-center justify-between py-2 border-b">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gray-300"></div> {/* Avatar Placeholder */}
      <div>
        <p className="text-sm font-semibold">{username}</p>
        <p className="text-xs text-gray-500">Followed by {followers}</p>
      </div>
    </div>
    <button className="text-blue-500 text-sm">Follow</button>
  </div>
);

const SuggestedUsers = () => {
  const [user, setUser] = useState({
    username: 'lathikakotian03',
    name: 'Lathika',
  });

  const suggestedUsers = [
    { username: 'instagram', followers: 'dfd' },
    { username: 'zaid', followers: 'gcgc+ 7 more' },
    { username: 'laxmi', followers: 'dgc b  + 2 months' },
    { username: 'vgv', followers: 'lhih+ 7 more' },
    { username: 'junior', followers: 'bhjhkhk' },
  ];

  return (
    <div className="w-full max-w-lg mx-0 bg-white px-6 py-4 mt-6 rounded-lg shadow-lg sticky top-24">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gray-300"></div> {/* Avata */}
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>
        <button className="text-blue-500 text-sm ml-auto">Switch</button>
      </div>

      {/* Suggested Users Section */}
      <div className="mb-6">
        <p className="text-md font-semibold">Suggested for you</p>
        {suggestedUsers.map((user, index) => (
          <SuggestedUserCard
            key={index}
            username={user.username}
            followers={user.followers}
          />
        ))}
      </div>

      
    </div>
  );
};

export default SuggestedUsers;
