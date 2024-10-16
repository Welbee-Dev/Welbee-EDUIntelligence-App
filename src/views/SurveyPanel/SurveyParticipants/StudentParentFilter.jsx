import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import WbSwitch from '../../../components/common/WbSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FilterRow from './FilterRow'

export default function StudentParentFilter({
  participantFilter,
  setParticipantFilter,
  availableFitlers,
  availableSubfilters,
}) {
  const [filters, setFilters] = useState([
    {id: 1, andOr: null, type: null, equal: null, values: null},
  ])

  const updateFilters = (index, join, filter, operator, values) => {
    const f = participantFilter.studentFilters
    f[index] = {join, filter, operator, values}
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: [...f],
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: participantFilter.staffFilters,
    })
  }

  const addFilter = () => {
    var newFilters = participantFilter.studentFilters
    newFilters.push({join: 'and', filter: null, operator: 'is', values: null})
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: [...newFilters],
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: participantFilter.staffFilters,
    })
  }

  const removeFilter = idx => {
    debugger
    setParticipantFilter({
      allStudents: participantFilter.allStudents,
      studentFilters: [...participantFilter.studentFilters.splice(idx, 1)],
      all: participantFilter.all,
      allSchools: participantFilter.allSchools,
      schoolIds: participantFilter.schoolIds,
      allStaff: participantFilter.allStaff,
      staffFilters: participantFilter.staffFilters,
    })
  }

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControlLabel
          control={
            <WbSwitch
              size="small"
              checked={participantFilter.allStudents}
              onChange={e =>
                setParticipantFilter({
                  allStudents: e.target.checked,
                  studentFilters:
                    participantFilter.studentFilters &&
                    participantFilter.studentFilters.length > 0
                      ? [...participantFilter.studentFilters]
                      : [
                          {
                            join: null,
                            filter: null,
                            operator: null,
                            values: null,
                          },
                        ],
                  all: participantFilter.all,
                  allSchools: participantFilter.allSchools,
                  schoolIds: participantFilter.schoolIds,
                  allStaff: participantFilter.allStaff,
                  staffFilters:
                    participantFilter.staffFilters &&
                    participantFilter.staffFilters.length > 0
                      ? [...participantFilter.staffFilters]
                      : [
                          {
                            join: null,
                            filter: null,
                            operator: null,
                            values: null,
                          },
                        ],
                })
              }
            ></WbSwitch>
          }
          label={'All Students'}
        ></FormControlLabel>
      </Grid>

      <Grid lg={12} md={12} sm={12} xs={12} my={2}>
        {!participantFilter.allStudents &&
          participantFilter?.studentFilters?.map((filter, index) => (
            <FilterRow
              index={index}
              filter={{...filter}}
              addFilter={addFilter}
              updateFilters={updateFilters}
              removeFilter={removeFilter}
              filters={availableFitlers}
              subfilters={availableSubfilters}
              label={'student'}
            />
          ))}
      </Grid>
    </Grid>
  )
}
