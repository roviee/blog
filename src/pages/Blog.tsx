import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectIsOwnBlog } from '@/selectors/blogSelectors';
import { Calendar, User, ArrowLeft, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";

export const Blog = () => {
  const { currentBlog, loading } = useBlog();
  const navigate = useNavigate();

  const isOwnBlog = useSelector(selectIsOwnBlog);

  useEffect(() => {
    if (!currentBlog) {
      navigate("/");
    }
  }, [currentBlog, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-700 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-700 text-lg mb-4">No post selected.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Go back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-amber-100 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-amber-800 hover:text-amber-600 hover:bg-amber-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {isOwnBlog && (
              <Button
                onClick={() => navigate('/edit')}
                className="bg-amber-800 text-white hover:bg-amber-700"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Post
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 font-serif mb-6 leading-tight">
            {currentBlog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-8 border-b border-amber-100">
            <div className="flex items-center gap-2 text-amber-700">
              <User className="w-5 h-5" />
              <span className="text-lg">{currentBlog.author}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-700 md:ml-4">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">
                {new Date(currentBlog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-amber-900 leading-relaxed">
            <div className="whitespace-pre-wrap text-lg font-serif">
              {currentBlog.content}
            </div>
          </div>

          {/* Updated At */}
          {currentBlog.updated_at &&
            currentBlog.updated_at !== currentBlog.created_at && (
              <div className="mt-12 pt-8 border-t border-amber-100 text-sm text-amber-700">
                Last updated:{" "}
                {new Date(currentBlog.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
        </div>
      </article>
    </div>
  );
};
