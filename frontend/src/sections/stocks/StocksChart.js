import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
// @mui
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// ----------------------------------------------------------------------

const HEIGHT = 600

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2
  }
}))

// ----------------------------------------------------------------------

export default function StocksChart({ stocksData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'IBM Stock Price'
      }
    }
  }
  const labels = stocksData.chartLabels
  const data = {
    labels,
    datasets: [
      {
        label: 'Open',
        data: stocksData.chartData[0].data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Close',
        data: stocksData.chartData[1].data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  return (
    <RootStyle>
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <Bar options={options} data={data} />
      </Box>
    </RootStyle>
  )
}
