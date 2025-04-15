
import React from 'react';

interface NotificationItem {
  details: string;
  roomNumber: string;
  timestamp: string;
}

interface NotificationSectionProps {
  title: string;
  total: number;
  items: NotificationItem[];
  type: 'alert' | 'request' | 'maintenance';
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  title,
  total,
  items,
  type
}) => {
  // Map type to color classes
  const colorClasses = {
    alert: {
      header: 'bg-alert text-white',
      content: 'bg-alert-light',
      border: 'border-alert'
    },
    request: {
      header: 'bg-request text-white',
      content: 'bg-request-light',
      border: 'border-request'
    },
    maintenance: {
      header: 'bg-maintenance text-white',
      content: 'bg-maintenance-light',
      border: 'border-maintenance'
    }
  };

  return (
    <div className="mb-4 border border-gray-300 rounded-md overflow-hidden shadow-sm">
      {/* Header */}
      <div className={`flex justify-between px-4 py-2 ${colorClasses[type].header}`}>
        <h2 className="font-bold">{title}</h2>
        <div className="text-right">
          <div className="font-bold">Total {title}</div>
          <div>{total}</div>
        </div>
      </div>

      {/* Table */}
      <div className={`w-full ${colorClasses[type].content}`}>
        {/* Table Header */}
        <div className="grid grid-cols-3 border-b border-gray-300 text-sm font-semibold">
          <div className="p-2 text-left">Details</div>
          <div className="p-2 text-left">Room Number</div>
          <div className="p-2 text-left">Timestamp</div>
        </div>
        
        {/* Table Body */}
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-3 text-sm ${
              index < items.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="p-2 text-left">{item.details}</div>
            <div className="p-2 text-left">{item.roomNumber}</div>
            <div className="p-2 text-left">{item.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSection;
