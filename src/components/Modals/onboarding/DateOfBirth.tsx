import { useState } from 'react'
import api from '../../../lib/api';
import { useUser } from '../../../context/UserContext';

const DateOfBirth = ({ onNext }: { onNext: () => void }) => {
    const {user} = useUser()
    const [dateOfBirth, setDateOfBirth] = useState<string>(user.dateOfBirht || '')

    const handleSave = async () => {
        await api.patch("/user/profile", { dateOfBirth });
        onNext();
    };

    return (
        <div className='py-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Date of Birth</h1>
                <p className='text-sm text-gray-500 mt-2'>Please enter your date of birth.</p>
                <p className='text-sm text-gray-500'>You must be 18+ to use this app.</p>

                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="px-3 py-3 bg-secondary my-5 rounded-3xl w-full border border-gray-300 focus:outline-2 focus:outline-primary text-black"
                />
            </div>
            <div>
                <button onClick={handleSave} className='bg-primary cursor-pointer text-white w-full py-3 rounded-3xl font-semibold'>Next</button>
            </div>
        </div>
    )
}

export default DateOfBirth

