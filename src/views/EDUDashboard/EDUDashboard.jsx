import React from 'react'
import {Container, Grid, Stack, Chip, MenuItem} from '@mui/material'
import Header from '../../components/layouts/header/Header'
import WbTextField from '../../components/common/WbTextField'
import WbFloatButton from '../../components/common/WbFloatButton'

export default function EDUDashboard() {  
  return  (
    <>
      <Header />
      <div className="main-container insights-container">
        <Container maxWidth='lg'>
          <Grid container mt={3}>

            <Grid item lg={7} md={7} sm={6} xs={12}>
              <h1>Latest Survey</h1>
              <Stack direction="column" mt={4}>
                <h2>QTI (Quality Teaching Interactions)</h2>
                <Stack direction="row" alignItems="center" my={2}>
                  Audience:
                  <Stack direction="row" spacing={0.5} ml={0.5}>
                    <Chip className="audience-chip" label={'Student'} size="small" />
                    <Chip className="audience-chip" label={'Staff'} size="small" />
                  </Stack>
                </Stack>
                <div className="launch-date">Launch date/time: <span>Aug 09 2024, 19:00</span></div>
                <div className="launch-date">End date/time: <span>Aug 12 2024, 19:00</span></div>
              </Stack>
            </Grid>

            <Grid item lg={5} md={5} sm={6} xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <WbTextField label="Select Survey" select>
                    <MenuItem value={1} selected>Survey One</MenuItem>
                    <MenuItem value={2}>Survey Two</MenuItem>
                    <MenuItem value={3}>Survey Three</MenuItem>
                  </WbTextField>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <WbTextField label="Select School" select>
                    <MenuItem value={1} selected>School One</MenuItem>
                    <MenuItem value={2}>School Two</MenuItem>
                    <MenuItem value={3}>School Three</MenuItem>
                  </WbTextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className='body-container'>
                heatmap here
              </div>
            </Grid>
          </Grid>
        </Container>        
      </div>
      <WbFloatButton />
    </>
  )
}
