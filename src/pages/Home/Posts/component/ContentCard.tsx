import React from 'react';


interface ContentCardProps {
    content: string| URL ; //URL
  }

const ContentCard: React.FC<ContentCardProps> = ({ content}) => {
  return (
    <div className="border p-2 rounded-lg shadow-md">
      {/* Check if the content is an image or text */}
      {typeof content === 'string' ? (
        <p className="text-lg text-gray-700">{content}</p>
      ) : (
        <img 
          src={content.toString()} 
          alt="Content" 
          className="w-full h-auto rounded-lg" 
        />
      )}
    </div>
  );
};

export default ContentCard;
