import {Dialog, Grid, Stack, Container} from '@mui/material'
import React, {useEffect} from 'react'
import QuestionsSlides from './QuestionsSlides'
import WbButton from '../../components/common/WbButton'
import WbOutlineButton from '../../components/common/WbOutlineButton'

export default function SurveyTemplatePreview({template, onClose, onCopy}) {
  return (
    // <Dialog open={true} fullScreen={true} fullWidth={true}>
    <Container maxWidth="xxl" disableGutters>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="dashboard-container template-preview-container">
                <div className="left-container">
                    <div className="template-tags">
                        <div className="template-pname">{template?.name}</div>
                        <p>
                            Ensure the questions are relevant to the audience. you can always
                            edit the questions later before survey goes live. You can also add
                            more questions.
                        </p>
                    </div>
                    <div className="template-back-btn">                        
                        <WbButton CustomButtonText="Use this template" onClick={() => onCopy()}  sx={{width: '250px'}}/>
                        <WbOutlineButton CustomOutlineButtonText="back" onClick={onClose}  sx={{width: '250px'}}/>                       
                    </div>
                </div>
                <div className="right-container">
                    <div className="search-template">
                        <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <h3>Preview</h3>              
                            </Grid>            
                        </Grid>
                    </div>
                    <div className='template-preview'>
                        <Grid container>        
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <QuestionsSlides template={template}></QuestionsSlides>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Grid>
    </Container>
    // </Dialog>
  )
}
