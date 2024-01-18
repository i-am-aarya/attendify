import React, { useState } from 'react'
import SemesterOption from './SemesterOption'
import "./SemesterSelectionPanel.css"

const SemesterSelectionPanel = () => {

  return (
    <div className='semester-selection-panel'>
        <SemesterOption semester='1st'/>
        <SemesterOption semester='2nd'/>
        <SemesterOption semester='3rd'/>
        <SemesterOption semester='4th'/>
        <SemesterOption semester='5th'/>
        <SemesterOption semester='6th'/>
        <SemesterOption semester='7th'/>
        <SemesterOption semester='8th'/>
    </div>
  )
}

export default SemesterSelectionPanel