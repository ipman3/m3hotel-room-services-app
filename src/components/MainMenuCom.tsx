

export default function MainMenu() {
    const services = [
        { name: "Room Service", icon: "/assets/icons/room-service.svg", link: "/room-service" },
        { name: "Wellness & Spa", icon: "/assets/icons/spa.svg", link: "/spa" },
        { name: "Things to Do", icon: "/assets/icons/thing-to-do.svg", link: "/things-to-do" },
        { name: "Support", icon: "/assets/icons/support.svg", link: "/support" },
    ];

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/assets/imgs/hotel-image.png')",
                backgroundRepeat: "no-repeat",

            }}
        >
            {/* Centered card */}
            <div className="relative max-w-lg w-full z-10 flex flex-col items-center">
                {/* Header */}
                <div className="w-full h-64 sm:h-72 md:h-80 lg:h-45 flex flex-col justify-end text-white rounded-t-xl mb-3 p-4">
                    <h1 className="text-3xl font-bold">Good Morning!</h1>
                    <p className="text-sm mt-1">What do you want to order today?</p>
                </div>

                {/* Services section */}
                <div className="bg-[#F2F2F2] p-4 rounded-t-[30px] w-full">
                    <h2 className="text-base-success font-semibold mb-4">
                        Please choose below services
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {services.map((service) => (
                            <a key={service.name} href={service.link} className="block">
                                <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition transform">
                                    <div className="bg-base-background p-4 rounded-full w-16 h-16 flex items-center justify-center">
                                        <img src={service.icon} alt={service.name} className="w-12 h-12" />
                                    </div>
                                    <span className="text-sm font-bold mt-3 text-base-secondary">
                                        {service.name}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Offers & News section */}
                    <div className="mt-6 w-full">
                        <h2 className="text-base-success font-semibold mb-2">Offers & News</h2>
                        <div className="w-full overflow-x-auto">
                            <div className="flex gap-4">
                                <div className="min-w-[250px]">
                                    <img
                                        src="/assets/imgs/spa-package.jpg"
                                        alt="Spa Offer"
                                        className="w-full h-52 object-cover rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
