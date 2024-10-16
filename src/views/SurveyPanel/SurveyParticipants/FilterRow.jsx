import {Grid, IconButton, MenuItem, Select, Stack} from '@mui/material'
import React from 'react'
import {Add, RemoveCircleOutlineOutlined} from '@mui/icons-material'

export default function FilterRow({
  index,
  filter,
  addFilter,
  updateFilters,
  removeFilter,
  filters,
  subfilters,
  label,
}) {
  return (
    <div className="filter-block">
      <div className="filter-row">
        <div>
          {index === 0 ? (
            `where ${label}`
          ) : (
            <Select
              onChange={e => {
                updateFilters(
                  index,
                  e.target.value,
                  filter.filter,
                  filter.operator,
                  filter.values
                )
              }}
              value={filter.join}
            >
              <MenuItem key={'1-1'} value={'and'}>
                and
              </MenuItem>
              <MenuItem key={'1-2'} value={'or'}>
                or
              </MenuItem>
            </Select>
          )}
        </div>
        <div>
          <Select
            onChange={e =>
              updateFilters(
                index,
                filter.join,
                e.target.value,
                filter.operator,
                filter.values
              )
            }
            value={filter.filter}
          >
            {filters?.map((item, index) => (
              <MenuItem key={index} value={item.type}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Select
            value={filter.operator}
            onChange={e => {
              updateFilters(
                index,
                filter.join,
                filter.filter,
                e.target.value,
                filter.values
              )
            }}
          >
            <MenuItem value="is">is</MenuItem>
            <MenuItem value="not">not</MenuItem>
          </Select>
        </div>
        <div>
          <Stack spacing={1} direction="row">
            <Select
              multiple
              fullWidth
              value={filter.values ? filter.values : []}
              onChange={e =>
                updateFilters(
                  index,
                  filter.join,
                  filter.filter,
                  filter.operator,
                  e.target.value
                )
              }
            >
              {subfilters
                .filter(x => x.type === filter.filter)
                .map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.type === 'Job Role' ? item.id : item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
            <IconButton onClick={e => addFilter()} disableRipple>
              <Add />
            </IconButton>
          </Stack>
        </div>
      </div>
      <div>
        <IconButton>
          {filter.id === 1 ? (
            ''
          ) : (
            <RemoveCircleOutlineOutlined onClick={e => removeFilter(index)} />
          )}
        </IconButton>
      </div>
    </div>
  )
}
