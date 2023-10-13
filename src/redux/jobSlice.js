import {createSlice} from'@reduxjs/toolkit';


const initialState = {
    jobs: [],
    filtredJobs:[],
    initialized: false,

}
const jobSlice = createSlice({
    name:'jobSlice',
    initialState,
    reducers:{
        setJobs:(state,action) =>{
            state.jobs = action.payload,
            state.filtredJobs=action.payload
            state.initialized=true
        },
        addJob:(state,action) =>{
            state.jobs.push(action.payload)
        },

        //arama terimine göre filtreleme
        
        filterBySearch:(state,action) =>{
         
            //arama terimini küçük harfe çevirme(duyarlılığı ortadan kaldırmak için)
            const query = action.payload.toLowerCase()
            
         //aksiyonla gelen arama terimiyle eşleşen objelerle yeni bir dizi oluştur
            const filtred = state.jobs.filter((job)=>job.company.toLowerCase().includes(query)
            );

            //store'u güncelle
            state.filtredJobs = filtred

        },

        //duruma göre filtreleme
        filterByStatus:(state,action) =>{
            //askiyonun payload değeriyle eşleşen işlerle yeni bir dizi oluştur
           state.filtredJobs = state.jobs.filter((job)=>job.status === action.payload)
        },

        //tipine göre filtreleme
        filterByType:(state,action) =>{
            state.filtredJobs = state.jobs.filter((job)=>job.type === action.payload)
        },
       //sıralama işlemlerini
       sortJobs: (state, action) => {
        switch (action.payload) {
          case 'a-z':
            state.filtredJobs.sort((a, b) => {
              // eğerki a objesinin şirket ismi alfabede sıra olarak
              // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
              // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
              if (a.company < b.company) return -1;
              if (a.company > b.company) return 1;
              return 0;
            });
            break;
          case 'z-a':
            state.filtredJobs.sort((a, b) => {
              // eğerki a objesinin şirket ismi alfabede sıra olarak
              // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
              // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
              if (a.company < b.company) return 1;
              if (a.company > b.company) return -1;
              return 0;
            });
            break;
  
          case 'En Yeni':
            state.filtredJobs.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
  
          case 'En Eski':
            state.filtredJobs.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
  
          default:
            break;
        }
  
        return state;
      },
  
      // filtreli temizle
      clearFilters: (state) => {
        state.filtredJobs = state.jobs;
      },
    },
  });

export const {setJobs,addJob,filterBySearch, filterByStatus,filterByType, sortJobs,clearFilters} = jobSlice.actions

export default jobSlice.reducer;