import {Delete, Edit, MoreHoriz} from '@mui/icons-material'
import {Stack, Chip, Divider, IconButton, Menu, MenuItem} from '@mui/material'
import React from 'react'
import paths from '../../routes/paths'
import {useNavigate} from 'react-router-dom'

export default function SurveyCard({survey}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClose = event => {
    setAnchorEl(null)
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const getAudienceChip = audience => {
    switch (audience) {
      case 1:
        return <Chip className="audience-chip" label={'Staff'} size="small" />
      case 2:
        return <Chip className="audience-chip" label={'Parents'} size="small" />
      case 3:
        return (
          <>
            <Chip className="audience-chip" label={'Staff'} size="small" />
            <Chip className="audience-chip" label={'Parent'} size="small" />
          </>
        )
      case 4:
        return (
          <Chip className="audience-chip" label={'Students'} size="small" />
        )
      case 5:
        return (
          <>
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Staff'} size="small" />
          </>
        )
      case 6:
        return (
          <>
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Parents'} size="small" />
          </>
        )
      default:
        return (
          <>
            <Chip className="audience-chip" label={'Staff'} size="small" />
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Parents'} size="small" />
          </>
        )
    }
  }
  return (
    <div className="surveys">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div className="surveyname">{survey.name}</div>
        <div>
          {survey.status !== 'Live' && survey.status !== 'Closed' && (
            <IconButton
              onClick={() =>
                navigate(
                  paths.questionPanel.replace(
                    ':token',
                    encodeURIComponent(survey.token)
                  ),
                  {state: {survey: survey}}
                )
              }
              disableRipple
            >
              <Edit sx={{fontSize: '18px', marginRight: '10px'}} />
            </IconButton>
          )}
          <IconButton onClick={handleClick} disableRipple>
            <MoreHoriz sx={{fontSize: '24px'}} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="options-menu"
          >
            <MenuItem onClick={handleClose}>Copy survey link</MenuItem>
            <MenuItem onClick={handleClose}>Duplicate</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </Stack>
      <Divider orientation="horizontal" />

      <div>
        <Stack direction="row" mt={2} justifyContent="space-between">
          <div className="survey-date">
            Created {new Date(Date.parse(survey.createdAt)).toDateString()}
          </div>
          <div>
            <Chip
              label={survey.status}
              color={survey.status === 'Published' ? 'secondary' : 'primary'}
              size="small"
              variant="outlined"
            />
          </div>
        </Stack>

        <div className="survey-bottom">
          <Stack direction="row" spacing={0.5}>
            {survey.surveysTags?.map(x => (
              <Chip
                label={x}
                variant="outlined"
                size="small"
                className="tag-chip"
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={0.5} mt={1}>
            {getAudienceChip(survey.audience)}
          </Stack>
        </div>
      </div>
    </div>
  )
}
