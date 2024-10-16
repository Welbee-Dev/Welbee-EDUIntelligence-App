import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import WbSwitch from '../../../components/common/WbSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FilterRow from './FilterRow'

export default function StaffFilter({
  participantFilter,
  setParticipantFilter,
  availableFitlers,
  availableSubfilters,
}) {
  const [filters, setFilters] = useState([
    {id: 1, andOr: null, type: null, equal: null, values: null},
  ])

  const updateFilters = (index, join, filter, operator, values) => {
    const f = participantFilter.staffFilters
    if (f[index].filter !== filter) {
      operator = null
      values = null
    }
    f[index] = {join, filter, operator, values}
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: participantFilter.studentFilters,
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: [...f],
    })
  }

  const addFilter = () => {
    var newFilters = participantFilter.staffFilters
    newFilters.push({join: null, filter: null, operator: null, values: null})
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: participantFilter.studentFilters,
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: [...newFilters],
    })
  }

  const removeFilter = idx => {
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: participantFilter.studentFilters,
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: [...participantFilter.staffFilters.splice(idx, 1)],
    })
  }

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControlLabel
          control={
            <WbSwitch
              size="small"
              checked={participantFilter.allStaff}
              onChange={e =>
                setParticipantFilter({
                  allStudents: participantFilter.allStudents,
                  studentFilters: participantFilter.studentFilters,
                  all: participantFilter.all,
                  allSchools: participantFilter.allSchools,
                  schoolIds: participantFilter.schoolIds,
                  allStaff: e.target.checked,
                  staffFilters: participantFilter.staffFilters,
                })
              }
            ></WbSwitch>
          }
          label={'All Staff'}
        ></FormControlLabel>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
        {!participantFilter.allStaff &&
          participantFilter?.staffFilters?.map((filter, index) => (
            <FilterRow
              index={index}
              filter={{...filter}}
              addFilter={addFilter}
              updateFilters={updateFilters}
              removeFilter={removeFilter}
              filters={availableFitlers}
              subfilters={availableSubfilters}
              label={'staff'}
            />
          ))}
      </Grid>
    </Grid>
  )
}
