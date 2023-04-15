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

export default function WeatherGraph({rain}) {
	let data = {
		labels: ["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
		datasets: [
			{
				data: rain.map(data => data.rain && data.rain['1h'] ? data.rain['1h'] : 0),
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
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: false
			},
		},
		scales: {
			x: {
				display: false,
				grid: {
					display: true,
					drawBorder: false
				}
			},
			y: {
				display: true,
				beginAtZero: true,
				grid: {
					display: true,
					drawBorder: false
				}
			}
		},
		elements: {
			point: {
				radius: 0
			}
		}
	};

	return (
        <Line data={data} options={options} />
    )
}
