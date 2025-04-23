
import React, { useEffect } from 'react';
import ResponsiveNotificationSection from './ResponsiveNotificationSection';

const API_URL = "https://backend-deploy-gdgwdra8cpgqbxda.southeastasia-01.azurewebsites.net/dashboard";

const ResponsiveDashboard: React.FC = () => {
	const [alertItems, setAlertItems] = React.useState([]);
	const [requestItems, setRequestItems] = React.useState([]);
	const [maintenanceItems, setMaintenanceItems] = React.useState([]);
	const [lastRefreshTime, setLastRefreshTime] = React.useState<string>("");

	const fetchData = async () => {
		try {
			const response = await fetch(API_URL);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			const sortByTimestampDesc = (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

			const alerts = data.events
				.filter((item) => item.type === "emergency")
				.map((item) => ({
					details: item.details,
					roomNumber: item.room_number,
					timestamp: item.timestamp,
					projectID: "-",
				}))
				.sort(sortByTimestampDesc);

			const requests = data.events
				.filter((item) => item.type === "request")
				.map((item) => ({
					details: item.details,
					roomNumber: item.room_number,
					timestamp: item.timestamp,
					projectID: "-",
				}))
				.sort(sortByTimestampDesc);

			const maintenance = data.events
				.filter((item) => item.type === "maintenance")
				.map((item) => ({
					details: item.details,
					roomNumber: item.room_number,
					timestamp: item.timestamp,
					projectID: "-",
				}))
				.sort(sortByTimestampDesc);

			setAlertItems(alerts);
			setRequestItems(requests);
			setMaintenanceItems(maintenance);

			// Set current time as last refresh time
			const currentTime = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
			setLastRefreshTime(currentTime);

		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData(); // Initial fetch

		const interval = setInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 minutes

		return () => clearInterval(interval); // Clear interval on unmount
	}, []);

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="mb-4 sm:mb-6">
				<h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left">Hospital Notifications Dashboard</h1>

				{lastRefreshTime && (
					<p
						className="text-sm text-gray-700 mb-4"
						style={{
							backgroundColor: "#e0f2ff", // soft blue background
							padding: "6px 10px",
							borderRadius: "6px",
							border: "1px solid #b3daff", // subtle border for clarity
						}}
					>
						Last updated: {lastRefreshTime}
					</p>
				)}
			</div>

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