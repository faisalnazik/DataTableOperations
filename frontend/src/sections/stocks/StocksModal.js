/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Portal, Divider, Backdrop, IconButton, Typography, LinearProgress } from '@mui/material'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getStocks } from 'src/redux/slices/stocks'
import useResponsive from 'src/hooks/useResponsive'
import Iconify from 'src/components/Iconify'
import StocksChart from './StocksChart'

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 1999,
  minHeight: 440,
  outline: 'none',
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  flexDirection: 'column',
  margin: theme.spacing(3),
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper
}))

StocksModal.propTypes = {
  isOpenStocks: PropTypes.bool,
  onCloseStocks: PropTypes.func
}

export default function StocksModal({ isOpenStocks, onCloseStocks }) {
  const dispatch = useDispatch()
  const { stocksLoading, stocks } = useSelector((state) => state.stocks)

  const fullScreen = true

  const isDesktop = useResponsive('up', 'sm')

  useEffect(() => {
    dispatch(getStocks('IBM'))
  }, [])
  const handleClose = () => {
    onCloseStocks()
  }

  if (!isOpenStocks) {
    return null
  }

  return (
    <Portal>
      <Backdrop open={fullScreen || !isDesktop} sx={{ zIndex: 1998 }} />
      <RootStyle
        sx={{
          ...(fullScreen && {
            top: 0,
            left: 0,
            zIndex: 1999,
            margin: 'auto',
            width: {
              xs: `calc(100% - 24px)`,
              md: `calc(100% - 120px)`
            },
            height: {
              xs: `calc(100% - 24px)`,
              md: `calc(100% - 10px)`
            }
          })
        }}
      >
        <Box
          sx={{
            pl: 3,
            pr: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">Stocks</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Box>
        {stocksLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          <StocksChart stocksData={stocks} />
        )}
        <Divider />
      </RootStyle>
    </Portal>
  )
}
