import React from 'react'
import Header from './header/Header'
import {Outlet} from 'react-router-dom'
import '../assets/styles/App.scss'
import {Container, Grid} from '@mui/material'

export default function Base() {
  return (
    <div>
      <Container maxWidth="xxl" disableGutters>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div className="main-container">
            <Outlet />
          </div>
        </Grid>
      </Container>
    </div>
  )
}
