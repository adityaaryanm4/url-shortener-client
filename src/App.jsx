import React from 'react'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [shortened, setShortened] = useState(false)
  const handleChange = (e) => {
    setUrl(e.target.value)
  }
  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://url-shortener-vg1b.onrender.com/api/shorten', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ogUrl: url })
      })
      const data = await response.json()
      setShortened(true)
      setUrl(data.shortUrl)
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div>
      <div className='flex border border-gray-400 p-2 rounded-md gap-2 min-w-[200px] max-w-[800px]'>
        <input type="text" className='outline-none w-full' placeholder='Paste long url and shorten it' onChange={handleChange} />
        <button onClick={handleClick} className='bg-green-600 text-white p-2 rounded-md'>{loading ? 'Shortening...' : 'Shorten'}</button>
      </div>
      {shortened && <h2 className='mt-2'>{url}</h2>}
    </div>
  )
}

export default App