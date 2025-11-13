import * as React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-999">
      <div
        style={{ minHeight: 120, position: "relative" }}
        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/80 shadow-2xl w-[120px] max-w-[120px] h-[120px] max-h-[120px] overflow-hidden">
        <div className="inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
          <div style={{ position: "absolute", padding: 20 }}>
            <img src="/assets/imgs/m3_logo.png" alt="logo" width={35} height={35} />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div className="flex items-center justify-center text-4xl border-gray-300 rounded-full w-14 h-14 border-3 text-primary animate-spin border-t-primary"></div>
          </div>
        </div>
        <div className="flex  text-primary text-[13px] items-center justify-center text-center mt-[15px] p-0">{message}</div>
      </div>
    </div>
  );
};

export default Loading;
