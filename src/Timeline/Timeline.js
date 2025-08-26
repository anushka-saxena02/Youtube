import './Timeline.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_coverter } from '../Data'
import { useEffect, useState } from 'react'
import moment from 'moment'



const Timeline = ({category}) => {
    let [data ,steData]=useState([])
    let fetchData=async()=>{
        let vedioList_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
        await fetch (vedioList_url).then(response=>response.json()).then(data=>steData(data.items))
    }
    useEffect(()=>{
        fetchData();

    },[category])
  return (
    <div className='boxes'>
    {data.map((item,index)=>{
        return(
             <Link to={`vedio/${item.snippet.categoryId}/${item.id}`}    className='card' key={index}>
                
        <img src={item.snippet.thumbnails.medium.url} alt=''/>
        <h2>  {item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_coverter(item.statistics.viewCount)} views &bull; 
            {moment(item.snippet.publishedAt).fromNow()}</p>
    </Link>
   
        )
    })}
    </div>
          



    
  )
}

export default Timeline