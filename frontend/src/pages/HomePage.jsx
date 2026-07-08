import Navbar from "../components/Navbar";
import Button from "../components/Button";
import bgImg from "../assets/samagi-home-background.jpg";
import logoImg from "../assets/Samagi-icon-dark.png";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Headphones, RotateCcw } from "lucide-react";

const featureCards = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On all orders over Rs. 5,000. Fast and reliable delivery to your doorstep.",
    },
    {
        icon: Headphones,
        title: "Support 24/7",
        description: "Round-the-clock customer support. We're always here to assist you.",
    },
    {
        icon: RotateCcw,
        title: "Money Return",
        description: "30-day hassle-free returns. Full refund guaranteed if you're not satisfied.",
    },
];

const newArrivals = [
    { id: 1,  name: "LED Panel Light 20W",       price: "Rs. 2,450",  badge: "New", image: "https://picsum.photos/seed/elec1/300/300"  },
    { id: 2,  name: "Smart Switch Board",         price: "Rs. 1,850",  badge: "New", image: "https://picsum.photos/seed/elec2/300/300"  },
    { id: 3,  name: "MCB Circuit Breaker",        price: "Rs. 980",    badge: "New", image: "https://picsum.photos/seed/elec3/300/300"  },
    { id: 4,  name: "Cable Conduit 25mm",         price: "Rs. 420",    badge: "Hot", image: "https://picsum.photos/seed/elec4/300/300"  },
    { id: 5,  name: "3-Phase Stabilizer",         price: "Rs. 18,500", badge: "New", image: "https://picsum.photos/seed/elec5/300/300"  },
    { id: 6,  name: "Waterproof Socket",          price: "Rs. 1,200",  badge: "New", image: "https://picsum.photos/seed/elec6/300/300"  },
    { id: 7,  name: "Energy Meter Digital",       price: "Rs. 3,600",  badge: "Hot", image: "https://picsum.photos/seed/elec7/300/300"  },
    { id: 8,  name: "CCTV Power Supply",          price: "Rs. 2,100",  badge: "New", image: "https://picsum.photos/seed/elec8/300/300"  },
    { id: 9,  name: "Flexible Armoured Cable",    price: "Rs. 750",    badge: "New", image: "https://picsum.photos/seed/elec9/300/300"  },
    { id: 10, name: "Motion Sensor Light",        price: "Rs. 1,350",  badge: "Hot", image: "https://picsum.photos/seed/elec10/300/300" },
];

const HomePage = () => {
    return (
        <div className="flex flex-col bg-white text-black min-h-screen">
            {/* Sticky Navigation Bar */}
            <Navbar />

            {/* ── Hero Section ─────────────────────────────── */}
            <section className="relative flex items-center justify-center text-center min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.35,
                        zIndex: 0,
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <img
                        src={logoImg}
                        alt="Samagi Logo"
                        className="img-fluid mx-auto mb-20 mt-10"
                        style={{ maxHeight: "130px" }}
                    />
                    <h1 className="text-4xl md:text-4xl font-bold tracking-tight mb-4 ml-20 text-black" style={{ wordSpacing: "1rem" }}>
                        SAMAGI ENTERPRISES
                    </h1>
                    <div className="max-w-xl mx-auto">
                        <p className="lead mb-8 text-gray-500 text-lg">
                            For all your electrical needs. Experience premium service and high-quality products.
                        </p>
                        <Button to="/dashboard" className="text-base py-3 px-8">
                            VIEW PRODUCTS
                        </Button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 z-10">
                    <div className="flex flex-col items-center text-gray-500" style={{ animation: "bounce 2s infinite" }}>
                        <small className="mb-1 tracking-widest text-[10px] uppercase font-light">SEE MORE</small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* ── Feature Cards ─────────────────────────────── */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featureCards.map((card, index) => {
                            const IconComponent = card.icon;
                            return (
                                <div key={index}>
                                    <Card className="feature-card p-6 h-full text-center flex flex-col items-center cursor-pointer">
                                        <div className="flex flex-col items-center mb-3">
                                            <div className="text-black mb-3">
                                                <IconComponent size={36} strokeWidth={1.5} />
                                            </div>
                                            <h5 className="text-lg font-bold tracking-tight text-black">{card.title}</h5>
                                        </div>
                                        <CardContent className="p-0">
                                            <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── New Arrivals ──────────────────────────────── */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Just In</p>
                            <h2 className="text-2xl font-bold text-black">New Arrivals</h2>
                        </div>
                        <Button to="/dashboard" className="text-sm">View All</Button>
                    </div>

                    {/* 5-per-row product grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {newArrivals.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-xl transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                    {/* Product image */}
                                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Badge */}
                                        <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">
                                            {product.badge}
                                        </span>
                                    </div>

                                    {/* Product info */}
                                    <CardContent className="p-3">
                                        <p className="text-sm font-semibold text-gray-900 truncate leading-tight mb-1">{product.name}</p>
                                        <p className="text-sm font-bold text-black">{product.price}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────── */}
            <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
                <div className="container mx-auto text-center px-4">
                    <p className="text-xs tracking-wide">&copy; {new Date().getFullYear()} SAMAGI ENTERPRISES (PVT) LTD. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
