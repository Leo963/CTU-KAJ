import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

export default function WeatherGraph() {
	let data = {
		labels: ["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
		datasets: [
			{
				label: "precipitation",
				data: [10, 20, 20, 10, 0, 0, 0],
				borderColor: "rgba(0, 0, 255, 1)",
				backgroundColor: "rgba(0, 0, 255, 0.8)",
				fill: {
					target: "start",
					below: "rgba(0, 0, 255, 0.2)",
				},
				tension: 0.2,
			}]

	};
	let options = {
		options: {
			bezierCurve: true,
			legend: false
		}
	};
	return (
        <Line data={data} options={options} />
    )
}
