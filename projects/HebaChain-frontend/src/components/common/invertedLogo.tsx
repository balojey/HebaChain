import { Link } from "react-router-dom";

const InvertedLogo:React.FC = () => {
    return (
        <Link to="/">
            <div className="center gap-[0.5rem]">
                <img src="src/assets/svgs/inverted.svg" alt="logo" width={32} height={32} />
                <p className="text-normal leading-[30px] font-semibold text-white">HebaChain</p>
            </div>
        </Link>
    );
}

export default InvertedLogo;
