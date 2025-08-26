import React from 'react'
import Playvedio from '../Component/Playvedio/Playvedio'
import './Vedio.css'
import Recommended from '../Component/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Vedio = () => {
  const {videoId,categoryId}=useParams();
  console.log("vedio id get :",videoId)
  return (
    <div className='play-container'>
      <Playvedio videoId={videoId} />
      <Recommended categoryId ={categoryId} />
      
    </div>
    
  )
} 

export default Vedio
