import { useState } from 'react'
import Name from './Name'
import DateOfBirth from './DateOfBirth'
import Gender from './Gender'
import Avatar from './Avatar'
import { IoChevronBackOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { useUser } from '../../../context/UserContext'

const Onboarding = () => {
    const { onboarding, setOnboarding } = useUser()
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        { component: Name, title: 'Name' },
        { component: DateOfBirth, title: 'Date of Birth' },
        { component: Gender, title: 'Gender' },
        { component: Avatar, title: 'Avatar' }
    ]

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            // Onboarding complete
            setOnboarding(false)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        } else {
            setOnboarding(false)
        }
    }

    const handleClose = () => {
        setOnboarding(false)
    }

    if (!onboarding) return null

    const CurrentStepComponent = steps[currentStep].component

    return (
        <div className='w-full h-full absolute flex items-center justify-center bg-white/40'>
            <div className='w-100 h-[500px] transition-all duration-700 rounded-2xl bg-[#1c1c1c] text-white p-6 shadow-2xl overflow-auto'>
                <div className='flex items-center justify-between'>
                    <button 
                        onClick={handleBack}
                        className='cursor-pointer text-xl'
                    >
                        <IoChevronBackOutline />
                    </button>
                    <button 
                        onClick={handleClose}
                        className='cursor-pointer text-xl'
                    >
                        <RxCross2 />
                    </button>
                </div>
                <CurrentStepComponent onNext={handleNext} />
            </div>
        </div>
    )
}

export default Onboarding