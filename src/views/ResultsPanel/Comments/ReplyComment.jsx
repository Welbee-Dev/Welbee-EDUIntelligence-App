import {Button, Grid} from '@mui/material'
import React, {useEffect, useState} from 'react'
import WbModal from '../../../components/common/WbModal'
import WbTextField from '../../../components/common/WbTextField'
import commentsApi from '../../../services/api/comments/commentsApi'
import CircularProgress from '@mui/material/CircularProgress'
import WbButton from '../../../components/common/WbButton'

export default function ReplyComment({commentId, isAdmin}) {
  const [audience, setAudience] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    setLoading(true)
    commentsApi
      .GetRepliesByCommentId(commentId)
      .then(data => setComments(data))
      .finally(() => setLoading(false))
  }, [])

  const saveReply = () => {
    commentsApi
      .AddCommentReply({commentId, comment, isAdmin, audience})
      .then(data => {
        if (data) {
          setComments([...comments, data])
          // setShow(false)
          setComment('')
        }
      })
      .catch(e => console.log(e))
  }

  const getCommentReplies = () =>
    comments.map((c, i) => (
      <Grid item lg={12}>
        {c.isAdmin ? 'Admin: ' : 'You: '} {c.comment}
      </Grid>
    ))

  const getAdminView = () => {
    return (
      show && (
        <WbModal
          onClose={() => setShow(false)}
          content={
            <Grid container>
              {getCommentReplies()}
              <Grid item lg={12}>
                <WbTextField
                  label="Type you reply here"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                ></WbTextField>
              </Grid>
              <Grid item lg={12}>
                <WbButton
                  CustomButtonText="Save"
                  onClick={saveReply}
                ></WbButton>
              </Grid>
            </Grid>
          }
          title="Reply"
        ></WbModal>
      )
    )
  }
  const getParticipantView = () => {
    return (
      <Grid container>
        {getCommentReplies()}
        <Grid item lg={12}>
          <WbTextField
            label="Type you reply here"
            multiline
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></WbTextField>
        </Grid>
        <Grid item lg={12}>
          <WbButton CustomButtonText="Save" onClick={saveReply}></WbButton>
        </Grid>
      </Grid>
    )
  }
  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <div>
        {isAdmin && <Button onClick={e => setShow(true)}>Reply</Button>}
      </div>
      {isAdmin ? getAdminView() : getParticipantView()}
    </>
  )
}
