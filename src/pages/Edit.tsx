import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import { useBlog } from "@/hooks/useBlog";

export const Edit = () => {
  const navigate = useNavigate();
  const { currentBlog, editBlog, selectBlog, loading, error } = useBlog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title);
      setContent(currentBlog.content);
    }
  }, [currentBlog]);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    if (!currentBlog) return null;

    setIsLoading(true);

    try {
      await editBlog(currentBlog.id, { title, content });
      selectBlog(null);
      alert("Blog post updated!");
      navigate("/my-blog");
    } catch (err: any) {
      console.error("Error updating post:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-700">Loading post...</p>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-amber-50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-800 mb-4">
              Post not found
            </h1>
            <Button
              onClick={() => navigate("/my-blog")}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Back to My Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 font-serif">
              Edit Post
            </h1>
            <p className="text-amber-700 mt-2">Update your blog post</p>
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

        {/* Edit Form */}
        <form onSubmit={handleSave}>
          <Card className="p-8 border-amber-200 shadow-sm">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

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
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/my-blog")}
                className="text-amber-600 border-amber-300 hover:bg-amber-50 hover:text-amber-700"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};
