import { ImageAssets } from "../../../../public/assets/imgs/index";

export default function HomeHeader() {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  return (
    <div className="relative h-56 w-full rounded-b-[12px] overflow-hidden">
      <img src={ImageAssets.resortBackground} alt="Resort background" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[#407AA400] bg-gradient-to-t from-[#326081] to-transparent" />

      <div className="relative flex h-full flex-col justify-end pb-6 px-4 text-white">
        <h1 className="text-3xl font-bold">{getGreeting()}</h1>
        <p className="text-sm">What do you want to order today?</p>
      </div>
    </div>
  );
}
