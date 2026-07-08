import logoImg from "../assets/Samagi-icon-dark.png";

const Loading = () => {
    return (
        <div className="loading-screen">
            <div className="logo-spinner-container">
                <div className="logo-spinner" />
                <img src={logoImg} alt="Logo" className="spinner-logo" />
            </div>
            <p className="mt-4 text-gray-400 text-xs font-semibold uppercase tracking-widest">Loading</p>
        </div>
    );
};

export default Loading;
