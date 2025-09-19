import * as React from "react";

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <img src={"/assets/icons/m3_logo.svg"} alt="M3 Logo" className="w-32 h-32 animate-spin-slow" width={300} height={300} />
      <p className="absolute text-sm text-gray-300 bottom-4">
        Powered by <b className={"text-gray-500"}>Nealika Co., Ltd</b>
      </p>
    </div>
  );
};

export default SplashScreen;
