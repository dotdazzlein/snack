import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { MdOutlinePhoneIphone } from 'react-icons/md'
import PhoneSignin from './PhoneSignin'
import { useGoogleLogin } from '@react-oauth/google'
import api from '../../lib/api'
const Signin: React.FC = () => {

    const { signinModal, setSigninModal, setOnboarding, login,setUser } = useUser()
    const [phoneModal, setPhoneModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleSignin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {

            try {
          const res =  await api.post("/auth/google", {
                    access_token: tokenResponse.access_token,
                });
                const user = res.data.user
                localStorage.setItem("token",JSON.stringify(res.data.token))
                localStorage.setItem("user",JSON.stringify(res.data.user))
                setUser(res.data.user)
                if(!user.onboarding){
                    setOnboarding(true)
                }
            } catch (error) {                
                console.log(error);          
            } finally {
                setSigninModal(false)
            }
        },
    });


    if (!signinModal) return

    return (
        <div className='w-full h-full absolute flex items-center justify-center bg-white/40' onClick={() => setSigninModal(false)}>
            {!phoneModal ? <div onClick={(e) => e.stopPropagation()} className='w-100 transition-all duration-700 rounded-2xl bg-[#1c1c1c] text-white p-6 shadow-2xl'>
                <button
                    // onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    {/* <CgCross size={20} /> */}
                </button>

                {/* Logo */}
                <h1 className="text-center text-3xl font-bold mb-2">azar</h1>

                {/* Count */}
                <h2 className="text-center text-3xl font-bold mt-4">
                    220,972
                </h2>
                <p className="text-center text-gray-400 text-sm">
                    are matching now!
                </p>

                {/* Terms */}
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                    By tapping any "Continue" option below, you agree to the{" "}
                    <span className="underline cursor-pointer">Terms of Service</span>. Want
                    to know how we use your data? Read our{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
                    <span className="underline cursor-pointer">Cookie Policy</span>.
                </p>

                {/* Buttons */}
                <div className="mt-6 space-y-3">
                    <button
                        onClick={handleGoogleSignin}
                        // disabled={isLoading}
                        className="w-full bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img src="/icons/google.svg" className="h-5" />
                        Continue with Google
                    </button>
                    <button className="w-full bg-[#1877F2] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer">
                        <img src="/icons/x.svg" className="w-6" />
                        Continue with X
                    </button>

                    <button onClick={() => setPhoneModal(true)} className="w-full border border-gray-600 py-3 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer">
                        <MdOutlinePhoneIphone />
                        Continue with Phone
                    </button>

                </div>

                {/* Contact */}
                <p className="text-center text-sm text-gray-400 mt-5 underline cursor-pointer">
                    Contact us
                </p>
            </div> :
                <PhoneSignin setPhoneModal={setPhoneModal} />
            }
        </div>
    )
}

export default Signin