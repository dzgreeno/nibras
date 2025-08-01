import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Home, HelpCircle, Settings, X } from 'lucide-react';

interface FloatingAction {
  label: string;
  path: string;
  icon: React.ElementType;
  color: string;
}

interface FloatingActionButtonProps {
  actions?: FloatingAction[];
  mainIcon?: React.ElementType;
  mainColor?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = [
    { label: 'الرئيسية', path: '/student-dashboard', icon: Home, color: 'blue' },
    { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'green' },
    { label: 'الإعدادات', path: '/settings', icon: Settings, color: 'gray' }
  ],
  mainIcon: MainIcon = Plus,
  mainColor = 'blue'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Action buttons */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`block bg-${action.color}-500 hover:bg-${action.color}-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 group`}
              title={action.label}
              onClick={() => setIsOpen(false)}
            >
              <action.icon className="h-5 w-5" />
              <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-${mainColor}-600 hover:bg-${mainColor}-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform ${
          isOpen ? 'rotate-45' : 'rotate-0'
        } hover:scale-110`}
        title={isOpen ? 'إغلاق' : 'المزيد من الخيارات'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MainIcon className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default FloatingActionButton;