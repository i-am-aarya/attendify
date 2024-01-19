import React, { useState } from 'react'
import SemesterOption from './SemesterOption'
import { FilterData } from '../Sidebar'

const SemesterSelectionPanel = (
  {
    filter,
    setFilter
  }: {
    filter: FilterData,
    setFilter: React.Dispatch<React.SetStateAction<FilterData>>
  }
) => {

  return (
    <div className='semester-selection-panel'>
        <SemesterOption semester='1st' filter={filter} setFilter={setFilter} semesterText="first" />
        <SemesterOption semester='2nd' filter={filter} setFilter={setFilter} semesterText="second" />
        <SemesterOption semester='3rd' filter={filter} setFilter={setFilter} semesterText="third" />
        <SemesterOption semester='4th' filter={filter} setFilter={setFilter} semesterText="fourth" />
        <SemesterOption semester='5th' filter={filter} setFilter={setFilter} semesterText="fifth" />
        <SemesterOption semester='6th' filter={filter} setFilter={setFilter} semesterText="sixth" />
        <SemesterOption semester='7th' filter={filter} setFilter={setFilter} semesterText="seventh" />
        <SemesterOption semester='8th' filter={filter} setFilter={setFilter} semesterText="eighth" />
    </div>
  )
}

export default SemesterSelectionPanel