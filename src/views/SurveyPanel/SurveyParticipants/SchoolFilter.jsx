import React, {useEffect, useState} from 'react'
import {CUSTOMER_TYPE} from '../../../utils/constants'
import {participantsApi} from '../../../services'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import WbSwitch from '../../../components/common/WbSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'
import useCustomerData from '../../../hooks/useCustomerData'

export default function SchoolFilter({
  participantFilter,
  setParticipantFilter,
  schools,
}) {
  const customer = useCustomerData()
  // const [schools, setSchools] = useState([])

  // useEffect(() => {
  //   if (customer.customerType === CUSTOMER_TYPE.MAT) {
  //     participantsApi.getSchoolsByMatId(customer.id).then(res => {
  //       setSchools(res)
  //     })
  //   } else {
  //     setSchools([{name: customer.name, id: customer.id}])
  //   }
  // }, [])

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControlLabel
          control={
            <WbSwitch
              size="small"
              checked={participantFilter.allSchools}
              onChange={e =>
                setParticipantFilter({
                  all: participantFilter.all,
                  allSchools: e.target.checked,
                  schoolIds: participantFilter.schoolIds,

                  allStudents: participantFilter.allStudents,
                  studentFilters: participantFilter.studentFilters,

                  allStaff: participantFilter.allStaff,
                  staffFilters: participantFilter.staffFilters,
                })
              }
            ></WbSwitch>
          }
          label={'All Schools'}
        ></FormControlLabel>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} my={2}>
        <Select
          disabled={participantFilter.allSchools}
          multiple
          value={
            participantFilter?.schoolIds ? participantFilter.schoolIds : []
          }
          onChange={e =>
            setParticipantFilter({
              all: participantFilter.all,
              allSchools: participantFilter.allSchools,
              schoolIds: e.target.value,

              allStudent: participantFilter.allStudent,
              studentFilters: participantFilter.studentFilters
                ? [...participantFilter?.studentFilters]
                : [],

              allStaff: participantFilter.allStaff,
              staffFilters: participantFilter.staffFilters
                ? [...participantFilter?.staffFilters]
                : [],
            })
          }
          style={{
            display: participantFilter.allSchools ? 'none' : 'block',
          }}
        >
          {schools.map(school => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}
