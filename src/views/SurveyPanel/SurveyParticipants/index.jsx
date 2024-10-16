import {
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Stack,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import WbButton from '../../../components/common/WbButton'
import WbOutlineButton from '../../../components/common/WbOutlineButton'
import {useNavigate, useParams} from 'react-router-dom'
import paths from '../../../routes/paths'
import WbSwitch from '../../../components/common/WbSwitch'
import ParticipantCard from './ParticipantCard'
import SchoolFilter from './SchoolFilter'
import StudentParentFilter from './StudentParentFilter'
import StaffFilter from './StaffFilter'
import {participantsApi, surveysApi} from '../../../services'
import _ from 'lodash'
import {AUDIENCE, CUSTOMER_TYPE} from '../../../utils/constants'
import PublishButton from '../../../components/screens/surveyForms/PublishButton'
import useCustomerData from '../../../hooks/useCustomerData'

export default function SurveyParticipants() {
  const {token} = useParams()
  const navigate = useNavigate()

  const [survey, setSurvey] = useState(null)
  const [studentParent, setStudentParent] = useState([])
  const [staff, setStaff] = useState([])
  const [filteredStudentParent, setFilteredStudentParent] = useState([])
  const [filteredStaff, setFilteredStaff] = useState([])

  const [availableFitlers, setAvailableFitlers] = useState([])
  const [availableSubfilters, setAvailableSubfilter] = useState([])
  const [isStaffSurvey, setIsStaffSurvey] = useState(false)
  const [isParentSurvey, setIsParentSurvey] = useState(false)
  const [isStudentSurvey, setIsStudentSurvey] = useState(false)
  const [availableStaffFilters, setAvailableStaffFilters] = useState([])
  const [availableStaffSubfilters, setAvailableStaffSubfilter] = useState([])

  const [participantFilter, setParticipantFilter] = useState({
    all: true,
    allSchools: true,
    schoolIds: [],

    allStudents: true,
    studentFilters: [
      {
        join: null,
        filter: null,
        operator: null,
        values: null,
      },
    ],

    allStaff: true,
    staffFilters: [
      {
        join: null,
        filter: null,
        operator: null,
        values: null,
      },
    ],
  })

  const [list, setList] = useState() //needs to getch from people management
  const [schools, setSchools] = useState([])
  const customer = useCustomerData()
  const [loadingFilters, setLoadingFilters] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(true)

  useEffect(() => {
    surveysApi.get(token).then(survey => {
      setSurvey(survey)
      let isS = false
      let isP = false
      let isSt = false

      if (
        survey.audience === 1 ||
        survey.audience === 3 ||
        survey.audience === 5 ||
        survey.audience === 7
      ) {
        setIsStaffSurvey(true)
        isS = true
      }
      if (
        survey.audience === 2 ||
        survey.audience === 3 ||
        survey.audience === 6 ||
        survey.audience === 7
      ) {
        setIsParentSurvey(true)
        isP = true
      }
      if (
        survey.audience === 4 ||
        survey.audience === 5 ||
        survey.audience === 6 ||
        survey.audience === 7
      ) {
        setIsStudentSurvey(true)
        isSt = true
      }

      if (survey.participantFilter)
        setParticipantFilter(JSON.parse(survey.participantFilter))

      if (customer.customerType === CUSTOMER_TYPE.MAT) {
        participantsApi.getSchoolsByMatId(customer.id).then(res => {
          setSchools(res)

          let sIds = []
          res.map(item => sIds.push(item.id))

          if (isSt || isP) {
            participantsApi.getStudentParent(sIds).then(data => {
              createFilters(data)
            })
          } else {
            setLoadingStudents(false)
          }
          if (isS) {
            participantsApi
              .getStaff(sIds)
              .then(res => {
                createStaffFilters(res)
              })
              .catch(ee => {})
          } else {
            setLoadingFilters(false)
          }
        })
      } else {
        setSchools([{name: customer.name, id: customer.id}])

        if (isSt || isP) {
          participantsApi.getStudentParent([customer.id]).then(res => {
            createFilters(res)
          })
        }

        if (isS) {
          participantsApi.getStaff([customer.id]).then(res => {
            createStaffFilters(res)
          })
        }
      }
    })
  }, [])

  const createStaffFilters = res => {
    setFilteredStaff(res)
    setStaff(res)
    let fList = []
    res.forEach(item => {
      item.coreFilters.map(filter => {
        if (
          fList.findIndex(
            x => x.type === 'Department' && x.name === filter.department
          ) === -1 &&
          filter.department &&
          filter.department !== null
        ) {
          fList.push({
            type: 'Department',
            id: filter.department,
            name: filter.department,
          })
        }

        if (
          fList.findIndex(
            x => x.type === 'Job Type' && x.name === filter.employmentType
          ) === -1 &&
          filter.employmentType &&
          filter.employmentType > 0
        ) {
          fList.push({
            type: 'Job Type',
            id: filter.employmentType,
            name: filter.employmentType === 1 ? 'Full Time' : 'Part Time',
          })
        }
        if (filter.jobRole && filter.jobRole > 0) {
          if (
            fList.findIndex(
              x => x.type === 'Job Role' && x.id === filter.jobRole + ''
            ) === -1
          ) {
            fList.push({
              type: 'Job Role',
              id: filter.jobRole + '',
              name: getJobRoles(filter.jobRole),
            })
          }
        }
        if (filter.jobTitle && filter.jobTitle !== '') {
          if (
            fList.findIndex(
              x => x.type === 'Job Title' && x.name === filter.jobTitle
            ) === -1
          ) {
            fList.push({
              type: 'Job Title',
              id: filter.jobTitle,
              name: filter.jobTitle,
            })
          }
        }

        if (filter.phaseYear && filter.phaseYear !== null) {
          if (
            fList.findIndex(
              x => x.type === 'Key Stage' && x.id === filter.phaseYear
            ) === -1
          ) {
            fList.push({
              type: 'Key Stage',
              id: filter.phaseYear,
              name: filter.phaseYear,
            })
          }
        }

        if (filter.timeAtSchool && filter.timeAtSchool > 0) {
          if (
            fList.findIndex(
              x => x.type === 'Time At School' && x.id === filter.timeAtSchool
            ) === -1
          ) {
            fList.push({
              type: 'Time At School',
              id: filter.timeAtSchool,
              name: filter.timeAtSchool,
            })
          }
        }
      })
    })
    fList = [...fList.sort((a, b) => a.id - b.id)]
    setAvailableStaffFilters(_.uniqBy(fList, 'type'))
    setAvailableStaffSubfilter([...fList])

    setLoadingFilters(false)
  }
  const getJobRoles = roleId => {
    switch (roleId) {
      case 4:
        return 'Teaching Staff (Classroom)'

      case 8:
        return 'Teaching Staff (Non-Classroom)'

      case 16:
        return 'Support Staff (Classroom)'

      case 32:
        return 'Support Staff (Non-Classroom)'

      case 64:
        return 'Middle Leader'

      case 128:
        return 'Senior Leader'
    }
  }
  const createFilters = res => {
    setStudentParent(res)

    let fList = []

    res.forEach(item => {
      item.achievements.map(i => {
        if (
          fList.findIndex(
            x =>
              //x.id === i.achievementWondeID &&
              x.type === 'Achievement' && x.name === i.achievementType
          ) === -1
        )
          fList.push({
            type: 'Achievement',
            id: i.achievementWondeID,
            name: i.achievementType,
          })
      })

      item.behaviours.map(i => {
        if (
          fList.findIndex(
            x =>
              //x.id === i.behaviourWondeID &&
              x.type === 'Behaviour' && x.name === i.behaviourAction
          ) === -1
        )
          if (i.behaviourAction !== '') {
            fList.push({
              type: 'Behaviour',
              id: i.behaviourWondeID,
              name: i.behaviourAction,
            })
          }
      })

      item.classes.map(i => {
        if (
          fList.findIndex(
            x =>
              //x.id === i.classWondeID &&
              x.type === 'Class' && x.name === i.className
          ) === -1
        )
          fList.push({type: 'Class', id: i.classWondeID, name: i.className})
      })

      item.attendance?.map(i => {
        if (
          fList.findIndex(
            x =>
              //x.id === i.attendanceId &&
              x.type === 'Attendence' && x.name === i.presentMarks
          ) === -1
        )
          fList.push({
            type: 'Attendence',
            id: i.attendanceId,
            name: i.presentMarks,
          })
      })

      item.subjects?.map(i => {
        if (
          fList.findIndex(
            x =>
              //x.id === i.subjectWondeID &&
              x.type === 'Subject' && x.name === i.subjectText
          ) === -1
        ) {
          fList.push({
            type: 'Subject',
            id: i.subjectWondeID,
            name: i.subjectText,
          })
        }
      })
    })
    if (
      survey?.audience === 2 ||
      survey?.audience === 3 ||
      survey?.audience === 6 ||
      survey?.audience === 7
    ) {
      fList.push({type: 'Parent', id: 1, name: 'Father'})
      fList.push({type: 'Parent', id: 2, name: 'Mother'})
    }

    setAvailableFitlers(_.uniqBy(fList, 'type'))
    setAvailableSubfilter([...fList.sort((a, b) => a.name - b.name)])
    setLoadingStudents(false)
  }

  const redirect = path => {
    navigate(path.replace(':token', encodeURIComponent(token)), {
      state: {survey: {...survey}},
    })
  }

  const performFilter = () => {
    if (isStudentSurvey || isParentSurvey) {
      setFilteredStudentParent([...filterStudentParentList()])
    }
    if (isStaffSurvey) {
      setFilteredStaff([...filterStaffList()])
    }
  }
  useEffect(
    () => performFilter(),
    [
      staff,
      studentParent,
      isParentSurvey,
      isStaffSurvey,
      isStudentSurvey,
      participantFilter,
    ]
  )

  const filterStaffList = () => {
    let nfl = staff
    if (!participantFilter.allStaff) {
      participantFilter.staffFilters?.forEach(filter => {
        if (
          filter.values !== null &&
          filter.values.length > 0 &&
          filter.filter !== null &&
          filter.operator !== null
        ) {
          if (filter.join === 'and' || filter.join === null) {
            nfl = [...staffFilterList(nfl, filter)]
          } else if (filter.join === 'or' || filter.join === null) {
            nfl = [...nfl, ...staffFilterList(staff, filter)]
          }
        }
      })
    }
    return nfl
  }

  const staffFilterList = (nfl, filter) => {
    let ss = []
    nfl.filter(staff => {
      if (filter.filter === 'Job Role') {
        let rr = staff.coreFilters.filter(x =>
          filter.operator === 'is'
            ? filter.values.includes(x.jobRole + '')
            : !filter.values.includes(x.jobRole + '')
        )
        ss = [...ss, ...rr]
      }

      if (filter.filter === 'Job Title') {
        let rr = staff.coreFilters.filter(x =>
          filter.operator === 'is'
            ? filter.values.includes(x.jobTitle)
            : !filter.values.includes(x.jobTitle)
        )
        ss = [...ss, ...rr]
      }

      if (filter.filter === 'Department') {
        let rr = staff.coreFilters.filter(x =>
          filter.operator === 'is'
            ? filter.values.includes(x.department)
            : !filter.values.includes(x.department)
        )
        ss = [...ss, ...rr]
      }

      if (filter.filter === 'Key Stage') {
        let rr = staff.coreFilters.filter(x =>
          filter.operator === 'is'
            ? filter.values.includes(x.phaseYear)
            : !filter.values.includes(x.phaseYear)
        )
        ss = [...ss, ...rr]
      }
      if (filter.filter === 'Time At School') {
        let rr = staff.coreFilters.filter(x =>
          filter.operator === 'is'
            ? filter.values.includes(x.timeAtSchool)
            : !filter.values.includes(x.timeAtSchool)
        )
        ss = [...ss, ...rr]
      }
    })

    return ss
  }

  const filterStudentParentList = () => {
    let nfl = studentParent
    if (!participantFilter.allSchools) {
      nfl = [
        ...studentParent.filter(student =>
          participantFilter.schoolIds.includes(student.schoolId)
        ),
      ]
    }

    if (!participantFilter.allStudents) {
      participantFilter.studentFilters?.forEach(filter => {
        if (
          filter.values !== null &&
          filter.values.length > 0 &&
          filter.filter !== null &&
          filter.operator !== null
        )
          if (filter.join === 'and' || filter.join === null) {
            nfl = filterList(nfl, filter)
          } else if (filter.join === 'or' || filter.join === null) {
            nfl = [...nfl, ...filterList(studentParent, filter)]
          }
      })
    }
    return nfl
  }

  const filterList = (nfl, filter) => {
    let ss = []
    nfl.filter(student => {
      if (filter.filter === 'Attendence') {
        ss = [
          ...ss,
          ...student.attendance?.filter(attendance =>
            filter.operator === 'is'
              ? filter.values.includes(attendance.presentMarks)
              : !filter.values.includes(attendance.presentMarks)
          ),
        ]
      }

      if (filter.filter === 'Achievement') {
        ss = [
          ...ss,
          ...student.achievements?.filter(achievement =>
            filter.operator === 'is'
              ? filter.values.includes(achievement.achievementType)
              : !filter.values.includes(achievement.achievementType)
          ),
        ]
      }

      if (filter.filter === 'Subject') {
        ss = [
          ...ss,
          ...student.subjects?.filter(x =>
            filter.operator === 'is'
              ? filter.values.includes(x.subjectText)
              : !filter.values.includes(x.subjectText)
          ),
        ]
      }

      if (filter.filter === 'Class') {
        ss = [
          ...ss,
          ...student.classes?.filter(x =>
            filter.operator === 'is'
              ? filter.values.includes(x.className)
              : !filter.values.includes(x.className)
          ),
        ]
      }

      if (filter.filter === 'Behaviour') {
        ss = [
          ...ss,
          ...student.behaviours?.filter(x =>
            filter.operator === 'is'
              ? filter.values.includes(x.behaviourAction)
              : !filter.values.includes(x.behaviourAction)
          ),
        ]
      }
    })
    return ss
  }
  return (
    <Container maxWidth="lg">
      <div className="body-container participants">
        {loadingFilters || loadingStudents ? (
          <CircularProgress />
        ) : (
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1>Participants</h1>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
              <FormControlLabel
                control={
                  <WbSwitch
                    label={'All Participants'}
                    checked={participantFilter.all}
                    onChange={e => {
                      setParticipantFilter({
                        ...participantFilter,
                        all: e.target.checked,
                        schoolIds: [...schools.map(x => x.id)],
                      })
                      setFilteredStaff(staff)
                    }}
                  />
                }
                label={'All Participants'}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} mt={2} mb={1}>
              <h3>Filter Participants</h3>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className="participant-filter-box">
                {!participantFilter.all &&
                  customer.customerType === CUSTOMER_TYPE.MAT && (
                    <div className="participant-filter">
                      <SchoolFilter
                        participantFilter={participantFilter}
                        setParticipantFilter={setParticipantFilter}
                        schools={schools}
                      />
                    </div>
                  )}
                {!participantFilter.all &&
                  (isParentSurvey || isStudentSurvey) && (
                    <div className="participant-filter">
                      <StudentParentFilter
                        participantFilter={participantFilter}
                        setParticipantFilter={setParticipantFilter}
                        availableFitlers={availableFitlers}
                        availableSubfilters={availableSubfilters}
                      />
                    </div>
                  )}
                {!participantFilter.all && isStaffSurvey && (
                  <div className="participant-filter">
                    <StaffFilter
                      participantFilter={participantFilter}
                      setParticipantFilter={setParticipantFilter}
                      availableFitlers={availableStaffFilters}
                      availableSubfilters={availableStaffSubfilters}
                    />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={2} justifyContent="center" mb={10}>
                {isStaffSurvey && (
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <ParticipantCard type={'Staff'} list={filteredStaff} />
                  </Grid>
                )}
                {isParentSurvey && (
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <ParticipantCard
                      type={'Parents'}
                      list={filteredStudentParent}
                    />
                  </Grid>
                )}

                {isStudentSurvey && (
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <ParticipantCard
                      type={'Students'}
                      list={filteredStudentParent}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <WbOutlineButton
                  CustomOutlineButtonText={'Previous'}
                  onClick={e => redirect(paths.questionPanel)}
                />
                <div>
                  <Stack direction="row" spacing={1}>
                    <WbOutlineButton
                      CustomOutlineButtonText={'Cancel'}
                      onClick={e => redirect(paths.dashboard)}
                    />
                    <WbButton
                      CustomButtonText={'Save and Next'}
                      onClick={e =>
                        surveysApi
                          .updateParticipants(token, {...participantFilter})
                          .then(res => redirect(paths.invitesPanel))
                          .catch(err => console.error(err))
                      }
                    />
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12}>
              <PublishButton></PublishButton>
            </Grid>
          </Grid>
        )}
      </div>
    </Container>
  )
}
