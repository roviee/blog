import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, SquarePen, BookOpen, Menu, X } from "lucide-react";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  return (
    <>
      <nav className="bg-white border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <h1
                className="text-2xl sm:text-3xl font-bold text-amber-800 cursor-pointer font-serif whitespace-nowrap"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                BlogHub
              </h1>
              {/* Desktop Navigation */}
              {isAuthenticated && (
                <div className="hidden md:flex space-x-4">
                  <Button
                    variant="ghost"
                    className="text-amber-800 hover:text-amber-600 hover:bg-amber-50"
                    onClick={() => navigate("/write")}
                  >
                    <SquarePen className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-amber-800 hover:text-amber-600 hover:bg-amber-50"
                    onClick={() => navigate("/my-blog")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Blog
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-amber-800">
                    <User className="w-5 h-5" />
                    <span className="font-medium text-sm">
                      {user?.user_metadata.full_name || "User"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-amber-800 hover:text-amber-600 hover:bg-amber-50"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <LoginModal
                    open={loginOpen}
                    onOpenChange={setLoginOpen}
                    onSwitchToRegister={handleSwitchToRegister}
                  />

                  <RegisterModal
                    open={registerOpen}
                    onOpenChange={setRegisterOpen}
                    onSwitchToLogin={handleSwitchToLogin}
                  />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-amber-800 hover:bg-amber-50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-amber-200">
              {isAuthenticated ? (
                <>
                  <div className="py-3 px-4 border-b border-amber-100">
                    <div className="flex items-center space-x-2 text-amber-800">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {user?.user_metadata.full_name || "User"}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-800 hover:text-amber-600 hover:bg-amber-50 text-left py-2"
                    onClick={() => {
                      navigate("/write");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <SquarePen className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-800 hover:text-amber-600 hover:bg-amber-50 text-left py-2"
                    onClick={() => {
                      navigate("/my-blog");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Blog
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-800 hover:text-amber-600 hover:bg-amber-50 text-left py-2"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-amber-800 border-amber-300 hover:bg-amber-50"
                    onClick={() => {
                      setLoginOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => {
                      setRegisterOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
