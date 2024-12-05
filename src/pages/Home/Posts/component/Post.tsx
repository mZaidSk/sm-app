import ContentCard from "./ContentCard";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const Post = () => {
  const imageUrl = new URL("https://github.com/shadcn.png");

  return (
    <Card className="w-full max-w-xl shadow-lg border border-gray-300  bg-white rounded-lg overflow-hidden" >
      {/* Card Header */}

      

      <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
        <PostHeader />
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4">
        <ContentCard content={imageUrl} />
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
        <PostFooter />
      </CardFooter>
      
      
    </Card>
  );
};

export default Post;
