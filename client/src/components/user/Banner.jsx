import React from "react";
import { Card } from "../ui/card";
import { assets } from "@/assets/assets";

const Banner = () => {
    return (
        <Card className="bg-gradient-to-r from-blue-500 to-blue-100 md:rounded-lg rounded-none flex flex-col md:flex-row border-none md:max-w-5xl mx-auto p-4 md:p-6 items-center mt-24 mb-24">
            <div className="flex flex-col items-start gap-3 md:gap-5 text-white flex-1">
                <h3 className="text-2xl md:text-4xl mb-2 md:mb-3">Do you Own a Luxury Car?</h3>
                <p className="text-sm md:text-base">
                    Monetize your vehicle effortlessly by listing on CarRental. <br className="hidden md:block" />
                    We take care of insurance, driver verification, and secure payments - so <br className="hidden md:block" />
                    you can earn passive income, stress-free.
                </p>
                <button className="text-blue-600 rounded-lg bg-white px-5 py-2 mt-2 md:mt-0">
                    List your car
                </button>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0 flex-shrink-0">
                <img
                    src={assets.banner_car_image}
                    className="w-full max-w-xs md:max-w-sm pt-2 md:pt-10 object-contain"
                    alt="Banner Car"
                />
            </div>
        </Card>
    );
};

export default Banner;
