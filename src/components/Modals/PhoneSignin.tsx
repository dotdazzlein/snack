import React, { useRef, useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { useUser } from '../../context/UserContext'

const PhoneSignin = ({ setPhoneModal }: { setPhoneModal: React.Dispatch<React.SetStateAction<boolean>>
 }) => {
    const [step, setStep] = useState("phone")
    const { setSigninModal, setOnboarding  } = useUser()

    const OTP_LENGTH = 6;

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const sendOTP = () => {
        setStep("otp")
    }

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move to next input
        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const verifyOTP = async ()=> {
        const otpValue = otp.join("");
        console.log(otpValue);
        setOnboarding(true)
    }

    return (
        <div className='' onClick={(e) => e.stopPropagation()}>
            {step == "phone" ? <div className='w-100 transition-all duration-700 rounded-2xl bg-[#1c1c1c] text-white p-6 '>
                <div className='flex items-center justify-between mb-5'>
                    <button onClick={() => setPhoneModal(false)} className='cursor-pointer text-xl'><IoChevronBackOutline /></button>
                    <button onClick={() => setSigninModal(false)} className='cursor-pointer text-xl'><RxCross2 /></button>
                </div>

                {/* Title */}
                <h2 className="mb-6 text-2xl font-bold">My Number is</h2>

                {/* Country */}
                <div className="mb-4 cursor-not-allowed">
                    <label className="mb-1 block text-sm text-gray-400">
                        Country
                    </label>
                    <div className="flex items-center justify-between rounded-xl bg-[#2c2c2c] px-4 py-3">
                        <span>+91 (India)</span>
                        <span className="text-gray-400">▾</span>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm text-gray-400">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        // value={phone}
                        // onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-[#2c2c2c] px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Next Button */}
                <button
                    // disabled={!phone}
                    onClick={sendOTP}
                    className={`w-full cursor-pointer bg-primary text-black rounded-full py-3 text-lg font-semibold transition`}
                >
                    Next
                </button>
            </div> :
                <div className='w-100 transition-all duration-700 rounded-2xl bg-[#1c1c1c] text-white p-6 '>
                    <div className='flex items-center justify-between mb-5'>
                        <button onClick={() => setStep("phone")} className='cursor-pointer text-xl'><IoChevronBackOutline /></button>
                        <button onClick={() => setSigninModal(false)} className='cursor-pointer text-xl'><RxCross2 /></button>
                    </div>

                    {/* Title */}
                    <h2 className="mb-6 text-2xl font-bold">Enter OTP</h2>

                    <div className="flex gap-3 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    if (el) inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-xl font-bold rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-600 focus:border-primary transition"
                            />
                        ))}
                    </div>



                    <button
                        // disabled={}
                        onClick={verifyOTP}
                        className={`w-full cursor-pointer bg-primary text-black rounded-full py-3 text-lg font-semibold transition`}
                    >
                        Verify
                    </button>
                </div>
            }
        </div>
    )
}

export default PhoneSignin