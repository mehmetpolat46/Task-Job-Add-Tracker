import { useEffect } from "react"
import axios from "axios"
import {useDispatch,  useSelector} from 'react-redux'
import { setJobs } from "../redux/jobSlice"
import Filter from "../components/Filter"








const JobList = () => {
  const dispatch = useDispatch()
 const state = useSelector((store)=>store)
  useEffect(()=>{
    // eğer datadan 5sn içerisinde cevap gelmezse ekrana alert bas
    axios.get('http://localhost:3030/jobs',{timeout:5000})
    .then((res)=>dispatch(setJobs(res.data)))
    .catch((err)=>{if(err.code= "ECONNABORTED"){
      alert('bağlantınız zaman aşımına uğradı')}
    })
  },[])
  return (
    <div>
      <Filter/>
   <h3 className="job-count">
    Bulunan ({state?.jobs.length}) iş arasından ({state?.filtredJobs.length}) tanesini görüntülüyorsunuz
   </h3>
   <section className="list-section">
   {!state.initialized ? (
    <p>Yükleniyor...</p>
   )  :(
    state.filtredJobs.map((job)=> 
    <div className="job-card" key={job.id}>
      <div className="head">
        <div className="letter">
          <p>{job.company[0]}</p>
        </div>
        <div className="info">
          <p>{job.position}</p>
          <p>{job.company}</p>
        </div>
      </div>
      <div className="body">
        <div className="field">
          <img src="/images/map.png" />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <img src="/images/calendar.png" />
          <p>{job.date}</p>
        </div>
        <div className="field">
          <img src="/images/bag.png" />
          <p>{job.type}</p>
        </div>
        <div className="status">
          <span className={job.status}>{job.status}</span>
        </div>
      </div>
    </div> )
   )
  }
  </section>


    </div>
  )
}

export default JobList
