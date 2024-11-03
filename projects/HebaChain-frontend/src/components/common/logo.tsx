import { Link } from "react-router-dom";

const Logo:React.FC = () => {
    return (
        <Link to="/">
            <div className="center gap-[0.5rem]">
                <img src="src/assets/images/logo.png" alt="logo" width={32} height={32} />
                <p className="text-normal leading-[30px] font-semibold">HebaChain</p>
            </div>
        </Link>
    );
}

export default Logo;
