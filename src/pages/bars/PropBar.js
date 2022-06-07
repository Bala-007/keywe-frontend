import React from "react"
import ReactDOM from "react-dom"
import { Bar } from "react-chartjs-2"
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js"


Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)
class PropBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "bar",
      data: {
        labels: ["6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "Saved",
            backgroundColor: "#2d414e",
            data: [75, 20, 60, 55, 85, 55, 70],
            barPercentage: 0.9,
            barThickness: 10,
            bordercolor: "rgb(242, 242, 242)",
            maxBarThickness: 5,
            minBarLength: 2,
          },

          {
            label: "Scheduled Tours",
            backgroundColor: "#178be4",

            data: [55, 80, 40, 5, 45, 20, 25],
            barPercentage: 0.9,
            barThickness: 10,

            bordercolor: "rgb(242, 242, 242)",
            maxBarThickness: 5,
            minBarLength: 2,
          },
        ],
      },
    }
  }

  render() {
    const options = {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          drawTicks: false,
          drawOnchartArea: false,
          label: {
            display: true,
          },
          grid: {
            color: "green",
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
        y: {
          beginAtZero: true,
          display: false,
          grid: {
            // color: "green",
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 30,
          },
          display: true,
          position: "bottom",
          align: "start",
        },
      },
    }
    return (
      <Bar
        data={this.state.data}
        width={"100%"}
        height={"100px"}
        options={options}
      />
    )
  }
}
export default PropBar
