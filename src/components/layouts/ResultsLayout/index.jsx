import {
  AppBar,
  Button,
  Container,
  Box,
  Grid,
  Stack,
  Tooltip,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material'
import React, {useEffect} from 'react'
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'
import paths from '../../../routes/paths'
import useCustomerData from '../../../hooks/useCustomerData'
import useUserData from '../../../hooks/useUserData'

export default function ResultsLayout() {
  const pp = useParams()
  const {state} = useLocation()
  const navigate = useNavigate()
  const user = useUserData()
  const customer = useCustomerData()

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar className="header">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <div className="logo" onClick={e => navigate('/')}>
              <Typography variant="h6" color={'white'}>
                {customer.name}
              </Typography>
            </div>

            {/* Desktop Menu */}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <div className="header-middle">
                <Button style={{color: 'white'}}>SURVEYS</Button>
              </div>
              <div className="header-middle">
                <Button
                  style={{color: 'white'}}
                  onClick={e => navigate(paths.resultsDash)}
                >
                  QUESTIONS
                </Button>
              </div>
              <div className="header-middle">
                <Button
                  style={{color: 'white'}}
                  onClick={e => navigate(paths.comments)}
                >
                  COMMENTS
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
            <IconButton onClick={e => navigate('/')} disableRipple>
              {/* <DashboardIcon sx={{fontSize: '30px'}}/> */}
              <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0H11.1429V22.2857H0V0ZM1.71429 1.71429V20.5714H9.42857V1.71429H1.71429Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.8574 0H24.0003V10.2857H12.8574V0ZM14.5717 1.71429V8.57143H22.286V1.71429H14.5717Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.8574 12H24.0003V22.2857H12.8574V12ZM14.5717 13.7143V20.5714H22.286V13.7143H14.5717Z"
                  fill="white"
                />
              </svg>
            </IconButton>
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings" arrow>
                <IconButton
                  ///  onClick={handleOpenUserMenu}
                  sx={{p: 0}}
                >
                  <Avatar // {...stringAvatar(user.name)}
                  />
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
                {/* {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xxl" disableGutters>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Outlet />
        </Grid>
      </Container>
    </>
  )
}
