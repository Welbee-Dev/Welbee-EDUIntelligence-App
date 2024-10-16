import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import commentsApi from '../../../services/api/comments/commentsApi'
import ReplyComment from './ReplyComment'

export default function ParticipantReply() {
  const {commentId} = useParams()

  return <ReplyComment commentId={commentId} isAdmin={false} />
}
