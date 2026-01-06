import React, { useState } from 'react'
import api from '../../../lib/api';
import { useUser } from '../../../context/UserContext';
import Spinner from '../../Loading/Spinner';

const Name = ({ onNext }: { onNext: () => void }) => {

  const { user,setUser } = useUser()
  const [name, setName] = useState<string>(user?.name)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const handleSubmit = async () => {
    if(user.name == name){
      return onNext()
    }
    if (name == "") {
      return setError("Please enter name")
    }
    console.log("l");
    try {
      if (!user) return
      setLoading(true)
      setError("")

      const res = await api.patch("/user/profile", { name });
      setUser(res.data.user)
      onNext()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='py-5 h-full flex flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>My First Name</h1>
        <p className='text-sm text-gray-500 mt-2'>Your name will be shown in video chats.</p>
        <p className='text-sm text-gray-500 '>You can change it later!</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' className="px-3 py-3 bg-secondary my-5 rounded-3xl w-full border border-gray-300 focus:outline-2 focus:outline-primary" />
        <p className='text-red-500 text-sm'>{error}</p>
      </div>
      <div>
        <button onClick={handleSubmit} 
        disabled={loading && name == ""} 
        className={`${name?.length > 0 ? "bg-primary" : "bg-gray-300"} cursor-pointer text-white w-full py-3  rounded-3xl font-semibold`}>
          {loading ? <Spinner /> : "Next"}
        </button>
      </div>
    </div>
  )
}

export default Name