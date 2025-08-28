import React from "react";
import { Card, CardContent } from "../ui/card";
import { assets } from "@/assets/assets";

const TestimonialCard = () => {
    return (
        <Card className="border-none shadow-lg">
            <CardContent>
                <div className="flex flex-row items-center gap-2">
                    <img src={assets.testimonial_image_1} className="h-10 w-10" alt="User" />
                    <div className="flex flex-col items-start justify-start">
                        <p className="font-semibold text-sm">Emma Rodriguez</p>
                        <p className="text-sm">Barcelona, Spain</p>
                    </div>
                </div>
                <div className="flex flex-row my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <img src={assets.star_icon} key={index} alt="Star" />
                    ))}
                </div>
                <p>
                    "I've used many booking platforms but none compares to CarRental. My
                    experience was smooth and within no time I had already booked a car."
                </p>
            </CardContent>
        </Card>
    );
};

export default TestimonialCard;
