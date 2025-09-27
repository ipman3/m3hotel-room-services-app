import * as React from "react";
<<<<<<< HEAD

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <img src={"/assets/icons/m3_logo.svg"} alt="M3 Logo" className="w-32 h-32 animate-spin-slow" width={300} height={300} />
      <p className="absolute text-sm text-gray-300 bottom-4">
        Powered by <b className={"text-gray-500"}>Nealika Co., Ltd</b>
      </p>
    </div>
  );
=======
import { ImageAssets } from "../../../public/assets/imgs";
import { LoaderPinwheelIcon } from "lucide-react";

const SplashScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-muted-background">
           <div className="flex flex-col items-center">
             <img
                src={ImageAssets.m3Logo}
                alt="m3_logo"
                className="w-48 h-40"
                width={600}
                height={600}
                loading="lazy"
            />
            <LoaderPinwheelIcon className="animate-spin duration-300 transition-all text-base-primary" size={24} />
           </div>
            <p className="absolute text-sm text-muted-foreground bottom-4">Powered by <b className={"text-base-secondary"}>Nealika Co., Ltd</b></p>
        </div>
    );
>>>>>>> origin/Bunheng-Dev
};

export default SplashScreen;
