import { useEffect } from "react";
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";

export const FeaturedPosts = () => {
  const {
    blogs,
    totalCount,
    currentPage,
    loading,
    error,
    loadBlogs,
    changePage,
  } = useBlog();

  const totalPages = Math.ceil(totalCount / 6);

 useEffect(() => {
    loadBlogs(currentPage, 6);
  }, [currentPage, loadBlogs]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-amber-700">Loading posts...</p>
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col bg-white hover:bg-amber-50"
            >
              {/* Content */}
              <div className="p-6 grow flex flex-col">
                <h4 className="text-xl font-bold text-amber-900 font-serif mb-3 leading-tight">
                  {post.title}
                </h4>
                <p className="text-amber-800 text-sm leading-relaxed mb-4 grow line-clamp-3">
                  {post.content}
                </p>

                {/* Meta Information */}
                <div className="space-y-3 pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-xs text-amber-700">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center text-xs text-amber-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                {/* <Button
                variant="ghost"
                className="mt-4 text-amber-800 hover:text-amber-600 hover:bg-amber-50 justify-start pl-0"
              >
                Read Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button> */}
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-amber-700">No posts available yet.</p>
          </div>
        )}
      </div>
        {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-15">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="outline"
            className="border-amber-300 text-amber-600 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => changePage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className={
                  currentPage === page
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-amber-300 text-amber-600 hover:bg-amber-50"
                }
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-amber-300 text-amber-600 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>)}
    </>
  );
};
