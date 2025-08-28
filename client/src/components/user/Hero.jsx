import React from 'react'
import CarSearchCard from './CarSearchCard'
import { assets } from '@/assets/assets'

const Hero = () => {
    return (
        <div className="bg-blue-100 flex flex-col items-center justify-center w-full pt-12 pb-12 px-4 sm:pt-18 sm:pb-18">
            <h1 className="text-3xl sm:text-5xl font-semibold mb-6 sm:mb-10 text-center">
                Luxury Cars on Rent
            </h1>
            <CarSearchCard />
            <img
                src={assets.main_car}
                alt="Banner Car"
                className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl h-auto pt-6 sm:pt-8"
            />
        </div>
    )
}

export default Hero