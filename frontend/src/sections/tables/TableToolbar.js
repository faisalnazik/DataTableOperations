import PropTypes from 'prop-types'
import { Stack, InputAdornment, TextField } from '@mui/material'
// components
import Iconify from 'src/components/Iconify'

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  query: PropTypes.string,
  onSearch: PropTypes.func
}

export default function UserTableToolbar({ query, onSearch }) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search user..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}
