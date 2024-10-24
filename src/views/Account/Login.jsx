import {
  Grid,
  Stack,
  Button,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import WbTextField from '../../components/common/WbTextField'
import React, {useState, useEffect} from 'react'
import {RssFeed, Visibility, VisibilityOff} from '@mui/icons-material'
import axios from 'axios'
import {CUSTOMER_TYPE} from '../../utils/constants'
import {json, useNavigate} from 'react-router-dom'
import WbAlert from '../../components/common/WbAlert'
import { iconlogin } from '../../components/assets/images/index';

export default function Login() {
  let [email, setEmail] = useState('')
  let [password, setPwd] = useState('')
  let [showPassword, setShowPassword] = useState(false)
  let [lockScreen, setLockScreen] = useState(false)
  let [err, setErr] = useState('')
  let [pErr, setPErr] = useState('')

  // const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = () => {
    if (!email) {
      setErr('Email is required')
      return
    }
    if (!password) {
      setPErr('Password is required')
      return
    }

    setLockScreen(true)

    axios
      .post('https://api.welbee.co.uk/api/account/login', {
        email,
        password,
      })
      .then(res => {
        if (res.data.success === false) {
          setLockScreen(false)
          WbAlert({message: res.data.message, type: 'error'})
          return
        }
        let customer = {
          id:
            res.data.data.MatGroupId === 0 || res.data.data.MatGroupId === null
              ? res.data.data.schoolId
              : res.data.data.MatGroupId,
          name: res.data.data.schoolName,
          customerType:
            res.data.data.MatGroupId == 0 || res.data.data.MatGroupId === null
              ? CUSTOMER_TYPE.School
              : CUSTOMER_TYPE.MAT,
        }

        let user = {
          name:
            res.data.data.userInfo.FirstName +
            ' ' +
            res.data.data.userInfo.LastName,
          isMat:
            res.data.data.MatGroupId == 0 || res.data.data.MatGroupId === null
              ? false
              : true,
            email: res.data.data.userInfo.Email,
            Id: res.data.data.userInfo.Id,
        }

        debugger

        localStorage.setItem('token', res.data.data.access_token)
        localStorage.setItem('customer', JSON.stringify(customer))
        localStorage.setItem('user', JSON.stringify(user))

        // dispatch(updateCustomer(customer))
        // dispatch(updateUser(user))

        setLockScreen(false)
        navigate('/EDUDashboard')
      })
      .catch(err => {
        console.log(err)
        setLockScreen(false)
      })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5} md={5} display={{xs: 'none', lg: 'block'}}>
          <div className="login-main">
            <h1>
              Welcome to <span>Welbee Intelligent Ed</span>
            </h1>
            <p>
              Systematically measure and improve staff wellbeing
              <br />
              across your School or Group
            </p>
            <div className='login-symbol'>
                <img src={iconlogin} alt='' />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <div className="login-container">
            <div className="login-logo">
              <img
                alt=""
                src="https://welbee.international/wp-content/uploads/2021/04/welbee_logo_yellow.png"
              ></img>
            </div>
            <div className="body-container">
              <Stack spacing={2} className='login'>
                <h1>Welcome Back</h1>
                <p>Please enter your login details</p>

                <WbTextField
                  fullWidth
                  placeholder="Email"
                  label="Email"
                  value={email}
                  onChange={e => {
                    setErr('')
                    setEmail(e.target.value)
                  }}
                ></WbTextField>
                {err && <div style={{color: 'red'}}>{err}</div>}

                <WbTextField
                  fullWidth
                  label="Password"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{fontSize: 24}}
                        position="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {' '}
                        {showPassword ? (
                          <Visibility className="cursor_pointer" />
                        ) : (
                          <VisibilityOff />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={e => {
                    setErr('')
                    setPwd(e.target.value)
                  }}
                ></WbTextField>
                {pErr && <div style={{color: 'red'}}>{pErr}</div>}

                <div className="pink-link">Forgot your password?</div>
                <Button
                  className={lockScreen ? 'grey-button' : 'login-button'}
                  onClick={onLogin}
                  disabled={lockScreen}
                >
                  Login
                </Button>
                {lockScreen && (
                  <CircularProgress size={24} className="login-button-lock" />
                )}
              </Stack>
            </div>
          </div>
        </Grid>
      </Grid>
    </>    
  )
}
