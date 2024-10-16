import {Close} from '@mui/icons-material'
import {
  Modal,
  Box,
  Card,  
  CardHeader,  
  IconButton,
} from '@mui/material'
import React from 'react'

export default function WbModal({onClose, content, title, subtitle, width}) {
  return (
    <Modal open>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width ? width : '50%',          
          border: '0px',          
        }}
      >
        <Card sx={{padding: '24px', borderRadius: '0'}}>
          <CardHeader
            title={title}
            subheader={subtitle} 
            sx={{padding: '0px'}}           
            action={
              <IconButton aria-label="close" onClick={onClose}>
                <Close></Close>
              </IconButton>
            }
          />
          {content}
        </Card>
      </Box>
    </Modal>
  )
}
