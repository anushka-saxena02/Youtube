import React, { useEffect, useState } from 'react'
import './Playvedio.css'

import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_coverter } from '../../Data'
import { data, useParams } from 'react-router-dom'
import moment from 'moment/moment'


const Playvedio = () => {

let  {videoId}=useParams();
  
  let [apiData,setApiData] =useState(null)
  let [channelData ,setChannelData]=useState(null)
  let[comment,setComment]=useState([])
  let fetchVideoData = async()=>{
    let videoDetails_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))                         
 
  }  
  let fetchOtherData =async()=>{
    let channelDetail_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetail_url).then(res=>res.json()).then(data=>setChannelData (data.items[0]))
   let commentData_url=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
   await fetch(commentData_url).then(res=>res.json()).then(data=>setComment(data.items))
  
}
  useEffect(()=>{
    fetchVideoData();

  },[videoId])
  useEffect(()=>{
    if(apiData?.snippet?.channelId){
    fetchOtherData();
    }
  },[apiData])
  return (
    <div className='play-vedio'>
      
      <iframe  src={`https://www.youtube.com/embed/${videoId}? autoplay=1`} title="YouTube video player"frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullscreen
></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className='play-vedio-info'>
          <p>{apiData? value_coverter(apiData.statistics.viewCount):"17k"}Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"N/A"}</p>
    
        <div>
        <span><img src={like} alt=''/>{apiData?value_coverter(apiData.statistics.likeCount):"20"}</span>
        <span><img src={dislike} alt=''/></span>
        <span><img src={share} alt=''/>share</span>
        <span><img src={save} alt=''/>save</span>
    </div>
    </div>
    <hr/>
    <div className="Publisher">
   <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt=''></img>   
    <div>
    <p>{apiData?apiData.snippet.channelTitle:""} <br/><br/>{channelData? value_coverter(channelData.statistics.subscriberCount):"1M"}Subscriber</p>
    </div>
    <button>Suscribe</button>
    </div>
    <div className='video-description'>
      <p>{apiData?apiData.snippet.description.slice(0,250):"description here"}</p>
  
      <hr/>
      <h4>{apiData? value_coverter(apiData.statistics.commentCount):"10"}Comments</h4>
      {comment.map((item,index)=>{
         return(
                   <div key={index} className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''></img>
         <div>
        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <br/> 1 day ago</h3>
        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
      <div  className='comment-action'>
        <img src={like} alt=''/> <span>{  value_coverter( item.snippet.topLevelComment.snippet.likeCount)}</span>
        <img src= {dislike} alt=''/> <span>2 Likes</span>
        
      </div>
      </div>
     </div>


         )
      })}
        
      
      
          

  
    
          
     

    </div>
    </div>

     
  )
}

export default Playvedio
