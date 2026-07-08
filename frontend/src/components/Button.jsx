import { Link } from "react-router-dom";

const Button = ({ children, to, onClick, className = "", type = "button", disabled = false, ...props }) => {
    const combinedClass = `custom-btn ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClass} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClass}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
