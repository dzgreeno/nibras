import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  gradient?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  stats?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon = '📚',
  gradient = 'from-blue-600 to-purple-600',
  onBack,
  showBackButton = false,
  stats = []
}) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white p-6`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && onBack && (
              <button 
                onClick={onBack}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{icon} {title}</h1>
              {subtitle && <p className="text-blue-100">{subtitle}</p>}
            </div>
          </div>
          
          {stats.length > 0 && (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;