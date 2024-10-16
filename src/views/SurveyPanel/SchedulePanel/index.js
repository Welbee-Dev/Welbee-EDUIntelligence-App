import React, {useEffect, useState} from 'react'
import {groupCyclesApi} from '../../../services'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Container,
} from '@mui/material'
import {DatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import {SURVEY_CYCLE_TYPE, SURVEY_CYCLES} from '../../../utils/constants'
import {RemoveCircle} from '@mui/icons-material'
import WbOutlineButton from '../../../components/common/WbOutlineButton'
import WbButton from '../../../components/common/WbButton'
import 'dayjs/locale/en-gb'
import WbAlert from '../../../components/common/WbAlert'
import paths from '../../../routes/paths'
import WbTextField from '../../../components/common/WbTextField'
import WbRadioButton from '../../../components/common/WbRadioButton'
import PublishButton from '../../../components/screens/surveyForms/PublishButton'

export default function SchedulePanel() {
  const {token} = useParams()
  const navigate = useNavigate()
  const {state} = useLocation()

  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [launchOption, setLaunchOption] = useState(2)

  useEffect(() => {
    setLoading(true)
    groupCyclesApi
      .getBySurveyToken(token)
      .then(res => {
        let cycles = [...res.groupCycles]
        console.log('cycles', cycles)
        if (res.groupCycles.length === 0) {
          cycles.push({
            label: 'Cycle 1',
            startDate: null,
            endDate: null,
            endHour: null,
            endMin: null,
            startHour: null,
            startMin: null,
            status: 1,
          })
        }
        setSurvey({...res, groupCycles: [...cycles]})
      })
      .catch(e => {
        navigate('/404')
      })
      .finally(() => setLoading(false))
  }, [])

  const setStartDate = (date, index) => {
    let cycles = [...survey.groupCycles]
    cycles[index].startDate = date.format()
    setSurvey({...survey, groupCycles: [...cycles]})
  }
  const setEndDate = (date, index) => {
    let cycles = [...survey.groupCycles]
    cycles[index].endDate = date.format()
    setSurvey({...survey, groupCycles: [...cycles]})
  }
  const setStartTime = (e, index) => {
    let time = e.format('HH:mm')
    let cycles = [...survey.groupCycles]
    cycles[index].startHour = parseInt(time.split(':')[0])
    cycles[index].startMin = parseInt(time.split(':')[1])
    setSurvey({...survey, groupCycles: [...cycles]})
  }
  const setEndTime = (e, index) => {
    let time = e.format('HH:mm')
    let cycles = [...survey.groupCycles]
    cycles[index].endHour = parseInt(time.split(':')[0])
    cycles[index].endMin = parseInt(time.split(':')[1])
    setSurvey({...survey, groupCycles: [...cycles]})
  }

  const saveSchedule = () => {
    debugger
    let surveyCopy = {...survey}
    let cycles = [...survey.groupCycles]
    let frequency = surveyCopy.frequency
    if (surveyCopy.cycleType === 1) {
      frequency = 1
    }
    cycles = []
    for (let i = 0; i < frequency; i++) {
      let duration =
        surveyCopy.cycleType === SURVEY_CYCLE_TYPE.WEEKLY
          ? 7
          : surveyCopy.cycleType === SURVEY_CYCLE_TYPE.MONTHLY
            ? 30
            : surveyCopy.cycleType === SURVEY_CYCLE_TYPE.BI_MONTHLY
              ? 60
              : 90

      let cycleStartDate = new Date(survey.groupCycles[0].startDate).setDate(
        new Date(survey.groupCycles[0].startDate).getDate() + duration * i
      )
      let cycleEndDate = new Date(survey.groupCycles[0].startDate).setDate(
        new Date(survey.groupCycles[0].startDate).getDate() + duration * (i + 1)
      )

      cycles.push({
        label: 'Cycle ' + (i + 1),
        startDate: new Date(cycleStartDate),
        endDate: new Date(cycleEndDate),
        endHour: 8,
        endMin: 0,
        startHour: i === 0 ? parseInt(surveyCopy.groupCycles[0]?.startHour) : 8,
        startMin: i === 0 ? parseInt(surveyCopy.groupCycles[0]?.startHour) : 0,
      })
    }

    groupCyclesApi.post({...surveyCopy, groupCycles: [...cycles]}).then(res => {
      setSurvey({...survey, groupCycles: [...res]})
      WbAlert({message: 'Schedule Saved Successfully', type: 'success'})
    })
  }

  const shouldDisableTime = (value, view) => {
    const hour = value.hour()
    if (view === 'hours') {
      return hour < 8 || hour > 19
    }
    // if (view === 'minutes') {
    //   const minute = value.minute()
    //   return minute > 20 && hour === 13
    // }
    return false
  }

  const launchNow = val => {
    if (val === 1) {
      let cycles = [...survey.groupCycles]
      cycles[0].startDate = new Date().toISOString()
      cycles[0].startHour = new Date().getHours()
      cycles[0].startMin = new Date().getMinutes()
      //cycles[0].endDate = new Date().setDate(new Date().getDate() + 7).
      cycles[0].endHour = 8
      cycles[0].endMin = 0

      setSurvey({...survey, cycleType: 1, groupCycles: [...cycles]})
    }
    if (val === 2) {
      let surveyCopy = {...survey}
      surveyCopy.frequency = 2
      surveyCopy.cycleType = 1
      setSurvey({...surveyCopy, groupCycles: [...surveyCopy.groupCycles]})
    }
    setLaunchOption(val)
  }
  return (
    <Container maxWidth="lg">
      <div className="body-container">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1>Schedule</h1>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} my={2}>
              <div className="radio-button-container">
                <FormControl>
                  <RadioGroup value={launchOption} row>
                    <FormControlLabel
                      onChange={e => launchNow(1)}
                      value={1}
                      control={<WbRadioButton />}
                      label="Launch now"
                    />
                    <FormControlLabel
                      onChange={e => launchNow(2)}
                      value={2}
                      control={<WbRadioButton />}
                      label="Schedule"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            {launchOption === 2 && (
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    disablePast
                    label="Launch Date"
                    onChange={date => setStartDate(date, 0)}
                    value={
                      survey?.groupCycles[0]?.startDate
                        ? dayjs(survey?.groupCycles[0]?.startDate)
                        : null
                    }
                    shouldDisableDate={date =>
                      date.day() === 0 || date.day() === 6
                    }
                    slots={{textField: WbTextField}}
                  />
                  <TimePicker
                    label="Launch Time"
                    ampm={false}
                    onChange={e => {
                      setStartTime(e, 0)
                    }}
                    value={
                      survey?.groupCycles[0]?.startHour
                        ? dayjs(
                            `${survey?.groupCycles[0]?.startDate?.split('T')[0]}T${survey?.groupCycles[0]?.startHour ?? ''}:${survey?.groupCycles[0]?.startMin ?? ''}`
                          )
                        : null
                    }
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slots={{textField: WbTextField}}
                  />{' '}
                </Stack>
              </Grid>
            )}

            {launchOption === 2 && (
              <Grid item lg={8} md={12} sm={12} xs={12} my={2}>
                <ToggleButtonGroup
                  value={survey?.cycleType}
                  fullWidth={true}
                  className="schedule-toggle-btn"
                >
                  {Object.keys(SURVEY_CYCLES).map(key => (
                    <ToggleButton
                      key={key}
                      onClick={() => {
                        let surveyCopy = {...survey}
                        surveyCopy.cycleType = parseInt(key)
                        setSurvey({
                          ...surveyCopy,
                          groupCycles: [...surveyCopy.groupCycles],
                        })
                      }}
                      value={parseInt(key)}
                      style={{textTransform: 'none'}}
                    >
                      {SURVEY_CYCLES[parseInt(key)]}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            )}

            {survey?.cycleType === 1 ? (
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    minDate={
                      survey?.groupCycles?.length > 0 &&
                      dayjs(survey?.groupCycles[0]?.startDate)
                    }
                    disablePast
                    label="End Date"
                    onChange={date => {
                      setEndDate(date, survey.groupCycles.length - 1)
                    }}
                    value={
                      survey?.groupCycles[survey.groupCycles.length - 1]
                        ?.endDate
                        ? dayjs(
                            survey?.groupCycles[survey.groupCycles.length - 1]
                              ?.endDate
                          )
                        : null
                    }
                    shouldDisableDate={date =>
                      date.day() === 0 || date.day() === 6
                    }
                    slots={{textField: WbTextField}}
                  />
                  <TimePicker
                    label="End Time"
                    //disablePast
                    ampm={false}
                    onChange={e => {
                      setEndTime(e, survey.groupCycles.length - 1)
                    }}
                    value={
                      survey?.groupCycles[survey.groupCycles.length - 1]
                        ?.endHour
                        ? dayjs(
                            `${survey?.groupCycles[survey.groupCycles.length - 1]?.endDate?.split('T')[0]}T${survey?.groupCycles[survey.groupCycles.length - 1]?.endHour ?? ''}:${survey?.groupCycles[survey.groupCycles.length - 1]?.endMin ?? ''}`
                          )
                        : null
                    }
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slots={{textField: WbTextField}}
                  />
                </Stack>
              </Grid>
            ) : survey?.cycleType == 6 ? (
              survey?.groupCycles?.map((item, index) => (
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <WbTextField
                      label="Cycle Name"
                      value={item.label}
                      onChange={e => {
                        let cycles = [...survey.groupCycles]

                        let newLabel = {...survey}
                        newLabel.groupCycles[index].label = e.target.value
                        setSurvey({...newLabel, groupCycles: [...cycles]})
                      }}
                    ></WbTextField>

                    {index > 0 && (
                      <Button
                        disabled={launchOption === 2}
                        style={{color: 'red'}}
                        startIcon={<RemoveCircle />}
                        onClick={() => {
                          let cycles = [...survey.groupCycles]
                          cycles.splice(index, 1)
                          setSurvey({...survey, groupCycles: cycles})
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {' '}
                    <DatePicker
                      minDate={dayjs(
                        survey?.groupCycles[index > 0 ? index - 1 : 0]
                          ?.startDate
                      )}
                      disablePast
                      label="Launch Date"
                      onChange={date => setStartDate(date, index)}
                      value={
                        survey?.groupCycles?.length > 0 &&
                        survey?.groupCycles[index]?.startDate
                          ? dayjs(survey?.groupCycles[index]?.startDate)
                          : null
                      }
                      shouldDisableDate={date =>
                        date.day() === 0 || date.day() === 6
                      }
                      slots={{textField: WbTextField}}
                    />
                  </Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TimePicker
                      label="Launch Time"
                      ampm={false}
                      onChange={e => {
                        setStartTime(e, index)
                      }}
                      value={
                        survey?.groupCycles?.length > 0 &&
                        survey?.groupCycles[index]?.startHour
                          ? dayjs(
                              `${survey?.groupCycles[index]?.startDate?.split('T')[0]}T${survey?.groupCycles[index]?.startHour}:${survey?.groupCycles[index]?.startMin}`
                            )
                          : null
                      }
                      skipDisabled
                      shouldDisableTime={shouldDisableTime}
                      slots={{textField: WbTextField}}
                    />
                  </Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}></Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {' '}
                    <DatePicker
                      minDate={dayjs(survey?.groupCycles[index]?.startDate)}
                      disablePast
                      label="End Date"
                      onChange={date => {
                        setEndDate(date, index)
                      }}
                      value={
                        survey?.groupCycles?.length > 0
                          ? dayjs(survey?.groupCycles[index]?.endDate)
                          : null
                      }
                      shouldDisableDate={date =>
                        date.day() === 0 || date.day() === 6
                      }
                      slots={{textField: WbTextField}}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TimePicker
                      label="End Time"
                      //disablePast
                      ampm={false}
                      onChange={e => {
                        setEndTime(e, index)
                      }}
                      value={
                        survey?.groupCycles?.length > 0 &&
                        survey?.groupCycles[index]?.endHour
                          ? dayjs(
                              `${survey?.groupCycles[index]?.endDate?.split('T')[0]}T${survey?.groupCycles[index]?.endHour}:${survey?.groupCycles[index]?.endMin}`
                            )
                          : null
                      }
                      skipDisabled
                      shouldDisableTime={shouldDisableTime}
                      slots={{textField: WbTextField}}
                    />
                  </Grid>

                  {(launchOption === 2) &
                  (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {survey.groupCycles.length - 1 === index && (
                        <WbButton
                          CustomButtonText={'Add more'}
                          onClick={e => {
                            let cycles = [...survey.groupCycles]
                            cycles.push({
                              label: 'Cycle ' + (survey.groupCycles.length + 1),
                              startDate: cycles[cycles.length - 1].endDate,
                              startHour: cycles[cycles.length - 1].endHour,
                              startMin: cycles[cycles.length - 1].endMin,
                              endDate: cycles[
                                cycles.length - 1
                              ].endDate.setDate(
                                cycles[cycles.length - 1].endDate.getDate() + 7
                              ),
                              endHour: 8,
                              endMin: 0,
                            })
                            setSurvey({
                              ...survey,
                              groupCycles: [...cycles],
                            })
                          }}
                        ></WbButton>
                      )}
                    </Grid>
                  )}
                </Grid>
              ))
            ) : (
              launchOption === 2 && (
                <Grid item lg={8} md={12} sm={12} xs={12}>
                  <WbTextField
                    label="Frequency"
                    onChange={e =>
                      setSurvey({
                        ...survey,
                        frequency: parseInt(e.target.value),
                      })
                    }
                    type="number"
                    value={survey?.frequency ? survey?.frequency : 2}
                  />
                </Grid>
              )
            )}
          </Grid>

          <div className="summary-container">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12} mb={2}>
                <h2>Summary</h2>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                Launch Date and time
                {dayjs(survey?.groupCycles[0]?.startDate).format(
                  'DD/MM/YYYY'
                )}{' '}
                {(survey?.groupCycles[0]?.startHour + '').padStart(2, '0')}:
                {(survey?.groupCycles[0]?.startMin + '').padEnd(2, '0')}
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                Recurrence {SURVEY_CYCLES[survey?.cycleType]}
              </Grid>
              {survey?.cycleType === 1 ? (
                <Grid lg={12}>
                  End Date and Time{' '}
                  {dayjs(
                    survey.groupCycles[survey.groupCycles.length - 1].endDate
                  ).format('DD/MM/YYYY')}{' '}
                  {(
                    survey.groupCycles[survey.groupCycles.length - 1].endHour +
                    ''
                  ).padStart(2, '0')}
                  :
                  {(
                    survey.groupCycles[survey.groupCycles.length - 1].endMin +
                    ''
                  ).padStart(2, '0')}
                </Grid>
              ) : survey?.cycleType === 6 ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Table>
                    <TableBody>
                      {survey?.groupCycles?.map((item, index) => {
                        return (
                          <TableRow>
                            <TableCell>{item.label}</TableCell>
                            <TableCell>{item.startDate}</TableCell>
                            <TableCell>
                              {item.startHour}
                              {':'}
                              {item.startMin}
                            </TableCell>
                            <TableCell>
                              {item.endDate && item.endDate}
                            </TableCell>
                            <TableCell>
                              {item.endHour}
                              {':'}
                              {item.endMin}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              ) : (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  Frequency {survey?.frequency}
                </Grid>
              )}
            </Grid>
          </div>

          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <WbOutlineButton
                  CustomOutlineButtonText={'Previous'}
                  onClick={() =>
                    navigate(
                      paths.invitesPanel.replace(
                        ':token',
                        encodeURIComponent(token)
                      ),
                      {state: {survey: survey}}
                    )
                  }
                ></WbOutlineButton>

                <WbButton
                  CustomButtonText="Save as Draft"
                  onClick={saveSchedule}
                ></WbButton>
                <PublishButton></PublishButton>
              </Stack>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
    </Container>
  )
}
