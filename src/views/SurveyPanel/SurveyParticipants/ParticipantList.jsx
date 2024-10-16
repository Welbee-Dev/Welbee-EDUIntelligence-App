import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'

export default function ParticipantList({list}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
