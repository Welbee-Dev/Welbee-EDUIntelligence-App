import {Alert, Snackbar} from '@mui/material'
import React from 'react'
import {createRoot} from 'react-dom/client'
let root = createRoot(document.querySelector('#modal'))

const WbAlert = ({message, type}) => {
  if (root._internalRoot === null) {
    root = createRoot(document.querySelector('#modal'))
  }
  const unmount = () => {
    if (!root) return
    setTimeout(() => {
      root.unmount()
    }, 5000)
  }
  root.render(
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={true}
      autoHideDuration={6000}
    >
      <Alert
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  )

  unmount()
}

export default WbAlert
