import React from 'react'
import {
  Container,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {useNavigate} from 'react-router-dom'
import paths from '../../../routes/paths'
import useCustomerData from '../../../hooks/useCustomerData'
import useUserData from '../../../hooks/useUserData'

const settings = [
  //'Account',
  'Logout',
]

export default function Header() {
  const navigate = useNavigate()
  const user = useUserData()
  const customer = useCustomerData()

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const stringAvatar = name => {
    return {
      sx: {
        bgcolor: 'green',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AppBar className="header">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <div className="logo" onClick={e => navigate('/')}>
            <Typography variant="h6" color={'white'}>
              {customer.name}
            </Typography>
          </div>

          {/* Responsive Menu */}
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            ></Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
          <div className="header-middle">
              <Button style={{color: 'white'}} onClick={e => navigate(paths.EDUHome)}>HOME</Button>
            </div>
            <div className="header-middle">
              <Button style={{color: 'white'}} onClick={e => navigate(paths.EDUDashboard)}>SURVEYS</Button>
            </div>
            <div className="header-middle">
              <Button
                style={{color: 'white'}}
                onClick={e => navigate(paths.dashboard)}
              >
               GET INSIGHTS
              </Button>
            </div>
          </Box>
          {/* <Box sx={{flexGrow: 0, marginRight: 10}}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => navigate(paths.categories)}
              sx={{p: 1}}
            >
              categories
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => navigate(paths.subcategories)}
              sx={{p: 1}}
            >
              sub categories
            </Button>
          </Box>
          <Box sx={{flexGrow: 0, marginRight: 10}}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => navigate(paths.question)}
              sx={{p: 0}}
            >
              Add Question
            </Button>
          </Box> */}

          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar {...stringAvatar(user.name)} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  onClick={e => {
                    if (setting === 'Logout') {
                      logout()
                      return
                    }
                    handleCloseUserMenu()
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
