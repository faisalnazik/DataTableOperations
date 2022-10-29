import PropTypes from 'prop-types'
import { useState } from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { Avatar, TableRow, TableCell, Typography, MenuItem } from '@mui/material'
// components
import Label from 'src/components/Label'
import Iconify from 'src/components/Iconify'
import { TableMoreMenu } from 'src/components/table'
import UserEditModal from './UserEditModal'

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object
}

export default function UserTableRow({ row }) {
  const theme = useTheme()

  const { name, avatarUrl, company, role, isVerified, status } = row

  const [openMenu, setOpenMenuActions] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)

  const onEditRow = () => {
    setOpenEdit(true)
    setOpenMenuActions(null)
  }
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{company}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' })
          }}
        />
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow()
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
      <UserEditModal isOpenEdit={openEdit} onCloseEdit={() => setOpenEdit(false)} user={row} />
    </TableRow>
  )
}
