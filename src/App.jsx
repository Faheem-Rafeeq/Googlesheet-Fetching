import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [list, setList] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const sheetID = "1XiSaPyk6-rD3ZSDXw0gvcQ2DieW_orolha2sE6RRuxg"
  const range = ("A2:C19");
  const apiKey = "AIzaSyBuvufQkiT1xc0Unaiq1rCR1Ax6q0xK4o0"
  const api = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  useEffect(() => {
    getDataFrom()

  }, [])

  const getDataFrom = async () => {
    try {

      const res = await axios.get(api)
      console.log(res.data.values)
      setList(res.data.values)

    }
    catch (err) {
      console.log("error")
      setError(true)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <>

      <h1 className='flex justify-center font-bold text-3xl mt-1.5'>Google Sheet Fetching</h1>
      {error && 
      <div className="flex justify-center items-center h-screen">
      <div role="alert" className="alert alert-error items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! Task failed.</span>
      </div>
      </div>
      }
      {loading &&
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-xl flex justify-center items-center mt-[400]"></span>
        </div>
      }


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 mt-10">
        {list && list.map((items, index) => {
          const [title, price, image] = items;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center gap-3 max-w-xs w-full"
            >
              {image && (
                <img
                  src={image}
                  alt="image"
                  className="w-40 h-40 object-cover rounded-xl"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <h3 className="text-md text-gray-600">
                Price: <span className="font-medium">${price}</span>
              </h3>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default App
