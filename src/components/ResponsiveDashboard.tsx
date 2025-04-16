
import React from 'react';
import ResponsiveNotificationSection from './ResponsiveNotificationSection';

// Sample data matching the image
const alertItems = [
  {
    details: 'abdominal pain',
    roomNumber: '623',
    timestamp: '2024-09-09 01:31:17'
  }
];

const requestItems = [
  {
    details: 'extra pillows',
    roomNumber: '921',
    timestamp: '2024-09-09 01:30:14'
  },
  {
    details: 'bed linen change',
    roomNumber: '745',
    timestamp: '2024-09-09 01:30:26'
  },
  {
    details: 'nurse assistance for changing position/moving around',
    roomNumber: '915',
    timestamp: '2024-09-09 01:31:00'
  }
];

const maintenanceItems = [
  {
    details: 'TV remote',
    roomNumber: '492',
    timestamp: '2024-09-09 01:31:42'
  }
];

const ResponsiveDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left">Hospital Notifications Dashboard</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <ResponsiveNotificationSection 
          title="Alerts" 
          total={alertItems.length} 
          items={alertItems} 
          type="alert" 
        />
        
        <ResponsiveNotificationSection 
          title="Requests" 
          total={requestItems.length} 
          items={requestItems} 
          type="request" 
        />
        
        <ResponsiveNotificationSection 
          title="Maintenance" 
          total={maintenanceItems.length} 
          items={maintenanceItems} 
          type="maintenance" 
        />
      </div>
    </div>
  );
};

export default ResponsiveDashboard;

