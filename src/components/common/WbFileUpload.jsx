import {Grid, Link, Modal} from '@mui/material'
import React from 'react'
import WbModal from './WbModal'
import artifactApi from '../../services/api/artifacts/artifactService'

export default function WbFileUpload({setImageName}) {
  const [show, setShow] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  return (
    <>
      <Link href="#" underline="hover" onClick={e => setShow(true)}>
        Add image
      </Link>
      {show && (
        <WbModal
          content={
            <Grid container>
              <Grid item xs={12}>
                <h2>Upload Image</h2>
              </Grid>
              <Grid item xs={12}>
                <input
                  disabled={uploading}
                  type="file"
                  accept=".jpg, .png, .gif"
                  onChange={e => {
                    setUploading(true)
                    var formData = new FormData()
                    formData.append('file', e.target.files[0])
                    artifactApi
                      .post(formData)
                      .then(res => {
                        setImageName(res.filePath)
                        setShow(false)
                      })
                      .catch(err => console.error(err))
                      .finally(() => setUploading(false))
                  }}
                ></input>
              </Grid>
            </Grid>
          }
          onClose={() => setShow(false)}
        />
      )}
    </>
  )
}
