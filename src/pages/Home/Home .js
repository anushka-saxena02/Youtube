import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Timeline from '../../Timeline/Timeline'
import './Home.css'


const Home  = ({sidebar}) => {
  let [category,setCategory]=useState(0)
  return (
    <div>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
        <div className={`container ${sidebar?"":'large-container'}`}>
        <Timeline category={category}/>

        </div>
    </div>
  )
}

export default Home 
