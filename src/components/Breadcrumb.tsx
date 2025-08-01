import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronLeft className="h-4 w-4 text-gray-400 rotate-180" />
              )}
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                  {item.icon && <span className="ml-1">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600 flex items-center">
                  {item.icon && <span className="ml-1">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;