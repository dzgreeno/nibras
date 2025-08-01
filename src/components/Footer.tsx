import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Shield, BookOpen, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Platform Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">نبراس الجزائر</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              منصة تعليمية رقمية جزائرية تجمع بين التكنولوجيا المتقدمة والمناهج الجزائرية الأصيلة لتقديم تجربة تعلم تفاعلية وممتعة.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  الميزات
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  الأسعار
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  مركز الدعم
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">ميزات المنصة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 ml-2" />
                  التعلم التكيفي
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Users className="h-4 w-4 ml-2" />
                  التلعيب التفاعلي
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 ml-2" />
                  تحليلات متقدمة
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  دخول المنصة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">معلومات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 ml-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+213 23 XX XX XX</p>
                  <p className="text-gray-400">+213 23 XX XX XX</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-green-400 mt-0.5 ml-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">info@nibras-algeria.dz</p>
                  <p className="text-gray-400">sales@nibras-algeria.dz</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 ml-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">شارع ديدوش مراد</p>
                  <p className="text-gray-400">الجزائر العاصمة، الجزائر</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 منصة نبراس الجزائر. جميع الحقوق محفوظة.
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                خريطة الموقع
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;