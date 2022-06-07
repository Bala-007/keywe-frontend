import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Bar } from "react-chartjs-2"
import {
  Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController,
  PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale,
  Decimation, Filler, Legend, Title, Tooltip,
} from "chart.js"
import { buildStyles } from "react-circular-progressbar"
import { Circle } from "@mui/icons-material"
import { faL } from "@fortawesome/free-solid-svg-icons"

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

function PropBar(props) {
  const datas = props.activity
  console.log("activity details", props.activity)

  let online = []
  let sche = []
  let saves = []

  if(datas.value !== undefined){
    datas.value.map(obj => {
      online.push(obj.online_view)
      sche.push(obj.scheduled_tour)
      saves.push(obj.saves)
    })
    console.log(online, sche, saves)
  }


  const data = {
    labels: datas.durartion,
    datasets: [
      {
        label: "Online view",
        backgroundColor: "#2d414e",
        data: online,
        barPercentage: 0.5,
        barThickness: 10,
        bordercolor: "rgb(242, 242, 242)",
        maxBarThickness: 4,
        minBarLength: 2,
        borderRadius: 50,
      },

      {
        label: "Scheduled Tours",
        backgroundColor: "#178be4",
        data: sche,
        barPercentage: 0.9,
        barThickness: 10,
        bordercolor: "rgb(242, 242, 242)",
        maxBarThickness: 4,
        minBarLength: 2,
        borderRadius: 50,
      },
      {
        label: "Saves",
        backgroundColor: "#96A0A6",
        data: saves,
        barPercentage: 0.9,
        barThickness: 10,
        bordercolor: "rgb(242, 242, 242)",
        maxBarThickness: 4,
        minBarLength: 2,
        borderRadius: 50,
      },
    ],
  }

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
      data={data}
      width={"100%"}
      height={"50px"}
      options={options}
    />
  )

}
export default PropBar
