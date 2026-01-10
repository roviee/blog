import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { useBlog } from "@/hooks/useBlog";

export const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addBlog, loading } = useBlog();

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    try {
      await addBlog ({ title, content });
      alert("Blog post published!");
      navigate("/my-blog");
    } catch (error) {
      alert("Error publishing post");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 font-serif">
              Create New Post
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/my-blog")}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Write Form */}
        <form onSubmit={handlePublish}>
            <Card className="p-8 border-amber-200 shadow-sm">
              {/* Title Input */}
              <div className="mb-6">
                <Label htmlFor="title" className="text-amber-800 font-semibold">
                  Post Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Content Textarea */}
              <div className="mb-6">
                <Label htmlFor="content" className="text-amber-800 font-semibold">
                  Content
                </Label>
                <textarea
                  id="content"
                  placeholder="Write your blog post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="w-full mt-2 p-4 border border-amber-200 rounded-md focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans resize-none"
                />
                <p className="text-xs text-amber-600 mt-2">
                  {content.length} characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </Card>
          </form>
      </div>
    </div>
  );
};
