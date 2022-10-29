import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Portal, Divider, Backdrop, IconButton, Typography, FormGroup, Grid, TextField, Button } from '@mui/material'
// form

import useResponsive from 'src/hooks/useResponsive'
import Iconify from 'src/components/Iconify'

// Redux
import { useDispatch } from 'react-redux'
import { updateUser, getUsers } from 'src/redux/slices/user'

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 1999,
  minHeight: 100,
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

UserEditModal.propTypes = {
  isOpenEdit: PropTypes.bool,
  onCloseEdit: PropTypes.func,
  user: PropTypes.object
}

export default function UserEditModal({ isOpenEdit, onCloseEdit, user }) {
  const dispatch = useDispatch()
  const fullScreen = true
  const { id, name, company, role, isVerified, status } = user
  const [nameValue, setNameValue] = useState(name)
  const [companyValue, setCompanyValue] = useState(company)
  const [roleValue, setRoleValue] = useState(role)
  const [statusValue, setStatusValue] = useState(status)

  const isDesktop = useResponsive('up', 'sm')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      id: id,
      name: nameValue,
      company: companyValue,
      role: roleValue,
      isVerified: isVerified,
      status: statusValue
    }

    dispatch(updateUser(data))
    // onCloseEdit()
    dispatch(getUsers())
  }

  const handleClose = () => {
    onCloseEdit()
  }

  if (!isOpenEdit) {
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
              md: `calc(100% - 900px)`
            },
            height: {
              xs: `calc(100% - 24px)`,
              md: `calc(100% - 600px)`
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
          <Typography variant="h6">{name}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Box>

        <Divider />

        <FormGroup>
          <Grid container spacing={2} padding={2}>
            <Grid item md={3}>
              <TextField
                sx={{
                  width: 'auto'
                }}
                id="name"
                label="Name"
                variant="outlined"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                id="company"
                label="Company"
                variant="outlined"
                value={companyValue}
                onChange={(e) => setCompanyValue(e.target.value)}
              />
            </Grid>

            <Grid item md={3}>
              <TextField id="role" label="Role" variant="outlined" value={roleValue} onChange={(e) => setRoleValue(e.target.value)} />
            </Grid>

            <Grid item md={3}>
              <TextField
                id="status"
                label="Status"
                variant="outlined"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button onClick={handleSubmit}> Update </Button>
        </FormGroup>
      </RootStyle>
    </Portal>
  )
}
