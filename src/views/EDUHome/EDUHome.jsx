import React from 'react'
import {Container, Grid} from '@mui/material'
import Header from '../../components/layouts/header/Header'
import WbFloatButton from '../../components/common/WbFloatButton'

export default function EDUHome() {  
  return  (
    <>
      <Header />
      <div className="main-container insights-container">        
        <div className="insight-content">
          <Container maxWidth='lg'>
            <Grid container>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <h1>Hello</h1>
                <h2>What do you want to do today?</h2>
              </Grid>  
              
              <Grid container spacing={2} mt={2}>

                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <div className="body-container">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 13.5H12V30H6V13.5ZM24 19.5H30V30H24V19.5ZM15 6H21V30H15V6Z" fill="#007A7A"/>
                    </svg>
                    <h3>Analyse Survey Responses</h3>
                    <p>Analyze survey responses to uncover insights and guide decision-making.</p>
                  </div>
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <div className="body-container">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.907 19.5C29.5731 22.1436 28.3693 24.601 26.4851 26.4851C24.601 28.3693 22.1436 29.5731 19.5 29.907V33H16.5V29.907C13.8564 29.5731 11.399 28.3693 9.51485 26.4851C7.6307 24.601 6.42688 22.1436 6.093 19.5H3V16.5H6.093C6.42688 13.8564 7.6307 11.399 9.51485 9.51485C11.399 7.6307 13.8564 6.42688 16.5 6.093V3H19.5V6.093C22.1436 6.42688 24.601 7.6307 26.4851 9.51485C28.3693 11.399 29.5731 13.8564 29.907 16.5H33V19.5H29.907ZM18 27C20.3869 27 22.6761 26.0518 24.364 24.364C26.0518 22.6761 27 20.3869 27 18C27 15.6131 26.0518 13.3239 24.364 11.636C22.6761 9.94821 20.3869 9 18 9C15.6131 9 13.3239 9.94821 11.636 11.636C9.94821 13.3239 9 15.6131 9 18C9 20.3869 9.94821 22.6761 11.636 24.364C13.3239 26.0518 15.6131 27 18 27ZM18 22.5C19.1935 22.5 20.3381 22.0259 21.182 21.182C22.0259 20.3381 22.5 19.1935 22.5 18C22.5 16.8065 22.0259 15.6619 21.182 14.818C20.3381 13.9741 19.1935 13.5 18 13.5C16.8065 13.5 15.6619 13.9741 14.818 14.818C13.9741 15.6619 13.5 16.8065 13.5 18C13.5 19.1935 13.9741 20.3381 14.818 21.182C15.6619 22.0259 16.8065 22.5 18 22.5Z" fill="#53B5E0"/>
                    </svg>
                    <h3>Get Insights About My Data</h3>
                    <p>Explore survey data to uncover trends, insights, and key patterns.</p>
                  </div>
                </Grid>

              </Grid>
            </Grid>     
          </Container>
        </div>        
      </div>
      <WbFloatButton />                  
    </>
  )
}
