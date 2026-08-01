import './Timeline.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_coverter } from '../Data'
import { useEffect, useState } from 'react'
import moment from 'moment'

const Timeline = ({ category }) => {
  let [data, setData] = useState([])

  let fetchData = async () => {
    try {
      let vedioList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
      const response = await fetch(vedioList_url)
      const resData = await response.json()
      if (resData && resData.items) {
        setData(resData.items)
      }
    } catch (err) {
      console.error("Error fetching video list:", err)
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div className='boxes'>
      {data && data.map((item, index) => {
        return (
          <Link to={`vedio/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
            <div className='thumbnail-box'>
              <img src={item.snippet?.thumbnails?.medium?.url} alt={item.snippet?.title} />
            </div>
            <div className='card-info'>
              <h2>{item.snippet?.title}</h2>
              <h3>{item.snippet?.channelTitle}</h3>
              <p>
                {value_coverter(item.statistics?.viewCount || 0)} views &bull;{' '}
                {moment(item.snippet?.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default Timeline





















export default Timeline
