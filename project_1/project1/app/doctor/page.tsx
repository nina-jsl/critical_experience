import React from "react";
import Image from "next/image";
import Link from "next/link";

const Doctor = () => {
  return (
    <div
      id="doctor-page"
      className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="max-h-[90%] w-auto flex justify-center">
        <Image
          src="/doctor_layer1.jpg"
          className="object-contain"
          width={1600}
          height={1800}
          alt="doctor layer 1"
        />
      </div>
      {/* need to change where link should be placed */}
      <Link href = "/doctor/layer2">
        <p className="text-left mt-4 mx-8">
          A confident doctor stands ready, their white coat pristine and
          stethoscope in hand. Calm and composed, they embody the expectation of
          a flawless healer—trusted to fix all wounds with certainty.
        </p>
      </Link>
    </div>
  );
};

export default Doctor;
