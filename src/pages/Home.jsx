import React, { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import AllProducts from '../components/AllProducts'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'



function Home() {
    const [search, setSearch] = useState("")
  return (
    <div>
        <Navbar setSearch={setSearch} />
        {/* <Alert />  */}
     <CategoryFilter />
     <AllProducts search={search} />
   
    </div>
  )
}

export default Home

