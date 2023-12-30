"use client";

import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <InfinitySpin width="200" color="white" />
    </div>
  );
};

export default Spinner;
