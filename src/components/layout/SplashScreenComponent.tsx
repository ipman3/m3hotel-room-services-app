import * as React from "react";
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
};

export default SplashScreen;
