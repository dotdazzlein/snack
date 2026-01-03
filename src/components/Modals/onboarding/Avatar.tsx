import { useState, useRef } from 'react'

interface AvatarProps {
    onNext?: () => void
}

const Avatar = ({ onNext }: AvatarProps) => {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleNext = () => {
        if (onNext) {
            onNext()
        }
    }

    return (
        <div className='py-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Upload Profile Photo</h1>
                <p className='text-sm text-gray-400 mt-2'>Add a photo so others can see who you are.</p>
                <p className='text-sm text-gray-400'>You can change it later!</p>

                <div className='mt-8 flex justify-center'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        accept="image/*"
                        className="hidden"
                    />
                    
                    <div
                        onClick={handleAvatarClick}
                        className='relative w-30 h-30 rounded-full overflow-hidden border-4 border-primary cursor-pointer hover:opacity-90 transition-opacity'
                    >
                        {selectedAvatar ? (
                            <img 
                                src={selectedAvatar} 
                                alt="Profile photo" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className='w-full h-full bg-secondary flex items-center justify-center'>
                                <svg 
                                    className="w-16 h-16 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                    />
                                </svg>
                            </div>
                        )}
                        {/* Camera icon in bottom right */}
                        <div className='absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg'>
                            <svg 
                                className="w-6 h-6 text-black" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                                />
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button 
                    onClick={handleNext}
                    className='bg-primary cursor-pointer text-black w-full py-3 rounded-3xl font-semibold hover:bg-primary/90 transition-all'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Avatar