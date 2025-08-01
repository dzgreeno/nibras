import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  label: string;
  path: string;
  icon: LucideIcon;
  color: string;
  description?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  columns?: number;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  actions, 
  title = "الوصول السريع",
  columns = 4 
}) => {
  const getGridClass = () => {
    switch (columns) {
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-2 md:grid-cols-4';
      case 5: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-2 md:grid-cols-4';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
      <div className={`grid ${getGridClass()} gap-4`}>
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className={`bg-${action.color}-50 hover:bg-${action.color}-100 p-4 rounded-lg text-center transition-colors group block`}
            title={action.description}
          >
            <action.icon className={`h-8 w-8 text-${action.color}-600 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
            <span className={`text-sm font-medium text-${action.color}-800 block`}>
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;