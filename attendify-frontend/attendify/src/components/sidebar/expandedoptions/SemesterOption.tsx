import React, { useState } from 'react'
import "./SemesterOption.css"

const SemesterOption = ({semester}:{semester:string}) => {

    const [selected, setSelected] = useState(false)

    function handleSelection() {
        setSelected(!selected)
    }

  return (
    <div className={selected ? 'semester-option-selected' : 'semester-option'} onClick={handleSelection}>

        {semester}

    </div>
  )
}

export default SemesterOption