import { statusOptions,typeOptions } from "../constant"
import {v4} from 'uuid'
import { addJob } from "../redux/jobSlice"
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"





const AddJob = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    

    //form verilerinden bir obje oluşturma 
  const dataObj =  Object.fromEntries(formData )
 
  //objeye id ekleme 
  dataObj.id =v4()
  console.log(dataObj)

  //eklenme tarihi oluşturma 
  dataObj.date = new Date().toLocaleDateString()

  //! api'yi güncelleme 
  axios.post( 'http://localhost:3030/jobs',dataObj)
  .then(()=>{
   
  //! store'u güncelle
dispatch(addJob(dataObj))

    //anasayfaya yönlendir
    navigate('/')
    
    //bildirim göster
    toast.success('Başarıyla eklendi', {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      });


  })

  }
  return (
    <div className="add-sec">
     <h2>Yeni İş Ekle</h2>
     <form onSubmit={handleSubmit} >
      <div className="field">
        <label> Pozisyon</label>
        <input name="position" type="text" />
      </div>
      <div className="field">
        <label> Şirket</label>
        <input name="company" type="text" />
      </div>
      <div className="field">
        <label> Lokasyon</label>
        <input name="location" type="text" />
      </div>
      <div className="field">
        <label> Durum</label>
        <select name="status">
          {statusOptions.map((opt)=>(
            <option  key={opt.value} >{opt.label}</option>
          )
          )}
        </select>
      </div>
      <div className="field">
        <label> Tür</label>
        <select name="type">
        {typeOptions.map((sel)=>(
            <option key={sel.value} >{sel.label}</option>
          )
          )}
        </select>
       </div>
       <button>Ekle</button>
     </form>
    </div>
  )
}

export default AddJob
