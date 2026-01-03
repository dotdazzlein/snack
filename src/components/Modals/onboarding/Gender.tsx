import { useState } from 'react'

const Gender = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)

    const genders = ['Male', 'Female', 'Others']

    return (
        <div className='py-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Gender</h1>

                <div className='space-y-2 mt-5'>
                    {genders.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`px-3 py-3 cursor-pointer rounded-3xl w-full border transition-all ${
                                selectedGender === gender
                                    ? 'bg-primary border-primary text-black font-semibold'
                                    : 'bg-secondary border-gray-300'
                            }`}
                        >
                            {gender}
                        </button>
                    ))}
                </div>

            </div>
            <div>
                <button className='bg-primary cursor-pointer text-black w-full py-3  rounded-3xl font-semibold'>Next</button>
            </div>
        </div>
    )
}

export default Gender