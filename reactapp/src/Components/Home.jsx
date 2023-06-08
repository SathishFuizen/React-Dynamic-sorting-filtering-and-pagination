import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Components/Home.css'
import {AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";

const Home = () => {
    const [data,setData]= useState([])
    const [sorted,setSorted]=useState({sorted:"id",reversed:false})
    const [searchPhase,setSearchPhase]=useState("")

    const [currentpage,setCurrentPage]=useState(1)
    const currentPerPage = 3
    const lastIndex = currentpage * currentPerPage
    const firstIndex = lastIndex -currentPerPage
    const records = data.slice(firstIndex,lastIndex)
    const npages= Math.ceil(data.length / currentPerPage)
    const numbers = [...Array(npages+1).keys()].slice(1)

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])

    const sortById=()=>{
        setSorted({sorted:"id", reversed:!sorted.reversed})
        const userData=[...data]
        userData.sort((userA,userB)=>{
            if(sorted.reversed){
                return userB.id-userA.id
            }
            return userA.id-userB.id

        })
        setData(userData)

    }
    const sortByName=()=>{
        setSorted({sorted:"name", reversed:!sorted.reversed})
        const userData=[...data]
        userData.sort((userA,userB)=>{
            if (sorted.reversed){
                return (userB.name).localeCompare(userA.name)
            }
            return (userA.name).localeCompare(userB.name)

        })
        setData(userData)

    }
    const sortByEmail=()=>{
        setSorted({sorted:"email", reversed:!sorted.reversed})
        const userData=[...data]
        userData.sort((userA,userB)=>{
            if (sorted.reversed){
                return (userB.email).localeCompare(userA.email)
            }
            return (userA.email).localeCompare(userB.email)

        })
        setData(userData)

    }
    const render=()=>{
        if(sorted.reversed){
            return <AiOutlineArrowUp/>
        } 
        return <AiOutlineArrowDown/>
    }

    const search =(e)=>{
        const finalResult=data.filter((event)=>(
            event.name.toLowerCase().includes(e.target.value.toLowerCase())

        ))
        setData(finalResult);
        setSearchPhase(e.target.value)
       
      

    }

    const prePage=()=>{
        if(currentpage!==1){
            setCurrentPage(currentpage-1)
        }
    }
    const correctPage=(e)=>{
        setCurrentPage(e)
       
    }

    const nextPage=()=>{
        if(currentpage!==npages){
            setCurrentPage(currentpage+1)
        }
    }


  return (
    <>
    <div className='app'>
        <div className='search-container'>
            <input type="text" placeholder='Search....' value={searchPhase}  onChange={search}/>
        </div>
        <div className='main-container'>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortById}><span style={{marginRight:"10px"}}>ID</span>
                        {sorted.sorted ==="id"? render():null}
                        </th>
                        <th  onClick={sortByName}><span style={{marginRight:"10px"}}>NAME</span>
                        {sorted.sorted ==="name"? render():null}
                        
                        </th>
                        <th  onClick={sortByEmail}><span style={{marginRight:"10px"}}>EMAIL</span>
                        {sorted.sorted ==="email"? render():null}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                         records.map((item,i)=>(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
        <nav className='pagination'>
            <ul>
                <li>
                    <a href="#" onClick={prePage}> PrePage</a>
                </li>
                {
                    numbers.map((items,x)=>(
                        <li className={`${currentpage === items ? 'active' : " "}`} key={x}>
                            <a href='#' onClick={()=>correctPage(items)}>{items}</a>
                        </li>
                    )

                    )
                }
                 <li>
                    <a href="#" onClick={nextPage}> nextPage</a>
                </li>

            </ul>

        </nav>
        
      
    </div>
    </>
  )  



 

}

export default Home
