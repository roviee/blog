import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquarePen, Calendar, User, Eye, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "@/hooks/useBlog";

export const MyBlog = () => {
  const navigate = useNavigate();
  const { userBlogs, loading, loadUserBlogs, removeBlog, selectBlog } = useBlog();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadUserBlogs();
  }, [loadUserBlogs]);

  const handleDelete = async (blogId: string) => {
    try {
      await removeBlog(blogId);
      setDeleteConfirm(null);
      loadUserBlogs();
    } catch (error) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2 font-serif">
            My Blog
          </h1>

          {/* Right-side buttons */}
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/write")}
              className="text-amber-600 hover:text-amber-700 hover:bg-none-0"
            >
              <SquarePen className="w-4 h-4 mr-2" />
              Write
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-amber-600 hover:text-amber-700 hover:bg-none-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-amber-700">Loading posts...</p>
            </div>
          ) : userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="p-6 border-amber-200 hover:shadow-lg transition-shadow flex flex-col"
              >
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-amber-700 text-sm mb-4 line-clamp-3 grow">
                  {blog.content}
                </p>
                <div className="flex items-center text-xs text-amber-600 space-x-4 mb-4 pb-4 border-b border-amber-200">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {deleteConfirm === blog.id ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDelete(blog.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                    >
                      Confirm Delete
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      variant="outline"
                      className="flex-1 text-amber-600 border-amber-300 hover:bg-amber-50 hover:text-amber-700 text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        selectBlog(blog);
                        navigate(`/blog`);
                      }}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirm(blog.id)}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 text-sm"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-6 border-amber-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                No posts yet
              </h3>
              <p className="text-amber-700 mb-4">
                Start creating your first blog post to get started!
              </p>
              <Button
                onClick={() => navigate("/write")}
                variant="outline"
                className="text-amber-600 border-amber-300 hover:bg-amber-50"
              >
                Create Post
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
