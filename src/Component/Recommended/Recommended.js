import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_coverter } from '../../Data'
import { Link } from 'react-router-dom'


const Recommended = ({categoryId}) => {
    let [related,setRelated]=useState([])
   
    let fetchRelatedData=async()=>{
        let related_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
      await fetch (related_url).then(res=>res.json()).then(data=>setRelated(data.items))
    }
    useEffect(()=>{
        fetchRelatedData();
    },[])


  return (
    <div className='recommended'>
        {related.map((item,index)=>{
          return(
        <Link to={`/vedio/${item.snippet.categoryId}/${item.id}`}  key={index}  className='side-vedio'>
            <img src={item.snippet.thumbnails.medium.url} alt=''></img>
            <div className='vid-info'>
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{ value_coverter (item.statistics.viewCount)}</p>
            </div>
        </Link>

          )
        })}
    </div>
  


)
}

export default Recommended
