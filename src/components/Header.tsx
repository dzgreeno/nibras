import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, LogIn } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <MapPin className="h-8 w-8" />
            <h1 className="text-2xl font-bold">نبراس الجزائر</h1>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link 
              to="/" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-white/20 text-white' : ''
              }`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/about') ? 'bg-white/20 text-white' : ''
              }`}
            >
              من نحن
            </Link>
            <Link 
              to="/features" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/features') ? 'bg-white/20 text-white' : ''
              }`}
            >
              الميزات
            </Link>
            <Link 
              to="/pricing" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/pricing') ? 'bg-white/20 text-white' : ''
              }`}
            >
              الأسعار
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/contact') ? 'bg-white/20 text-white' : ''
              }`}
            >
              اتصل بنا
            </Link>
            <Link 
              to="/support" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/support') ? 'bg-white/20 text-white' : ''
              }`}
            >
              الدعم
            </Link>
            <Link 
              to="/detailed-curriculum" 
              className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                isActive('/detailed-curriculum') ? 'bg-white/20 text-white' : ''
              }`}
            >
              المنهاج الجزائري
            </Link>
            <Link 
              to="/test" 
              className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-semibold"
            >
              🧪 اختبار
            </Link>
            <Link 
              to="/system-validation" 
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-semibold"
            >
              🔍 فحص النظام
            </Link>
            <Link 
              to="/login" 
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center font-semibold"
            >
              <LogIn className="h-4 w-4 ml-1" />
              دخول
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-2 pt-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/') ? 'bg-white/20 text-white' : ''
                }`}
              >
                الرئيسية
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/about') ? 'bg-white/20 text-white' : ''
                }`}
              >
                من نحن
              </Link>
              <Link 
                to="/features" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/features') ? 'bg-white/20 text-white' : ''
                }`}
              >
                الميزات
              </Link>
              <Link 
                to="/pricing" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/pricing') ? 'bg-white/20 text-white' : ''
                }`}
              >
                الأسعار
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/contact') ? 'bg-white/20 text-white' : ''
                }`}
              >
                اتصل بنا
              </Link>
              <Link 
                to="/support" 
                onClick={() => setIsMenuOpen(false)}
                className={`hover:text-green-200 transition-colors px-3 py-2 rounded-md ${
                  isActive('/support') ? 'bg-white/20 text-white' : ''
                }`}
              >
                الدعم
              </Link>
              <Link 
                to="/test" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-semibold"
              >
                🧪 اختبار الصفحات
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-white text-green-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center font-semibold"
              >
                <LogIn className="h-4 w-4 ml-1" />
                دخول
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;