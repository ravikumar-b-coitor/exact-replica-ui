
import React from 'react';

interface NotificationItem {
	details: string;
	roomNumber: string;
	projectID: string;
	timestamp: string;
}

interface ResponsiveNotificationSectionProps {
	title: string;
	total: number;
	items: NotificationItem[];
	type: 'alert' | 'request' | 'maintenance';
}

const ResponsiveNotificationSection: React.FC<ResponsiveNotificationSectionProps> = ({
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
					<div className="text-xs sm:text-base font-bold">Total {title}</div>
					<div>{total}</div>
				</div>
			</div>

			{/* Desktop Table View (hidden on small screens) */}
			<div className={`hidden sm:block w-full ${colorClasses[type].content}`}>
				{/* Table Header */}
				<div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-gray-300 text-sm font-semibold">
					<div className="p-2 text-left">Details</div>
					<div className="p-2 text-left">Room Number</div>
					{/* <div className="p-2 text-left">Category</div> */}
					<div className="p-2 text-left">Project ID</div>
					<div className="p-2 text-left">Timestamp</div>
				</div>

				{/* Table Body */}
				{items.map((item, index) => (
					<div
						key={index}
						className={`grid grid-cols-[2fr_1fr_1fr_1fr] text-sm ${index < items.length - 1 ? 'border-b border-gray-200' : ''
							}`}
					>
						<div className="p-2 text-left truncate">{item.details}</div>
						<div className="p-2 text-left">{item.roomNumber}</div>
						{/* <div className="p-2 text-left">{item?.category}</div> */}
						<div className="p-2 text-left">{item?.projectID}</div>
						<div className="p-2 text-left">{item.timestamp}</div>
					</div>
				))}
			</div>

			{/* Mobile Card View (visible only on small screens) */}
			<div className={`sm:hidden w-full ${colorClasses[type].content}`}>
				{items.map((item, index) => (
					<div
						key={index}
						className={`p-3 ${index < items.length - 1 ? 'border-b border-gray-200' : ''
							}`}
					>
						<div className="grid grid-cols-2 gap-1 text-sm">
							<div className="font-semibold">Details:</div>
							<div>{item.details}</div>

							<div className="font-semibold">Room Number:</div>
							<div>{item.roomNumber}</div>

							<div className="font-semibold">Timestamp:</div>
							<div>{item.timestamp}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ResponsiveNotificationSection;
