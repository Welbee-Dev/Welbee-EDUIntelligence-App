import {
  AppBar,
  Button,
  Container,
  Grid,
  Stack,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'
import paths from '../../../routes/paths'
import useUserData from '../../../hooks/useUserData'
import {surveysApi} from '../../../services'
import {survey} from '../../../services/endpoints'

const settings = ['Account', 'Logout']

export default function SurveyPanel() {
  const pp = useParams()
  const state = useLocation()
  const navigate = useNavigate()
  const user = useUserData()
  const [survey, setSurvey] = useState(null)

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
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

  useEffect(() => {
    surveysApi.get(pp.token).then(res => {
      setSurvey(res)
    })
  }, [])

  return (
    <>
      <AppBar className="header">
        <Container maxWidth="xxl">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="survey-name">
                <span>{survey?.name}</span>
                <span className="header-tags">Tag</span>
              </div>

              <div className="main-menu">
                <Button
                  onClick={e =>
                    navigate(
                      paths.questionPanel.replace(
                        ':token',
                        encodeURIComponent(pp.token)
                      )
                      //,{state: {survey: state.survey}}
                    )
                  }
                >
                  Create
                </Button>

                <Button
                  onClick={e =>
                    navigate(
                      paths.surveyParticipants.replace(
                        ':token',
                        encodeURIComponent(pp.token)
                      )
                      //,{state: {survey: state.survey}}
                    )
                  }
                >
                  Participants
                </Button>

                <Button
                  onClick={e =>
                    navigate(
                      paths.invitesPanel.replace(
                        ':token',
                        encodeURIComponent(pp.token)
                      )
                      //,{state: {survey: state.survey}}
                    )
                  }
                >
                  Invites
                </Button>

                <Button
                  onClick={e =>
                    navigate(
                      paths.schedulePanel.replace(
                        ':token',
                        encodeURIComponent(pp.token)
                      )
                      //,{state: {survey: state.survey}}
                    )
                  }
                >
                  Schedule
                </Button>
              </div>

              <div>
                <Tooltip title="Go to dashboard" arrow>
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
                </Tooltip>
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Stack>
          </Grid>
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
