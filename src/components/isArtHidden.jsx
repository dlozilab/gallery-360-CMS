import React from 'react'

import { FaEye,FaEyeSlash } from "react-icons/fa6";


export default function IsArtHidden({isHidden}) {
    
  return getRandomBoolean()? <FaEyeSlash color='white'/>:<FaEye color='white'/>
}
