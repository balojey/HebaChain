import React from "react";
import CustomButton from "./common/button";
import { enqueueSnackbar } from 'notistack'
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    const handleBetaTest = () => {
        enqueueSnackbar('Coming Soon')
    }
    return (
        <div className="w-full hero md:gap-10 gap-6 center flex-col pt-16 pb-10" style={{
            backgroundImage: "url(../assets/images/heroBackground.png)",
            background: "linear-gradient(142deg, rgba(94, 204, 139, 0.05) 23.54%, rgba(150, 118, 245, 0.05) 49.43%, rgba(190, 175, 233, 0.05) 88.89%)",
            backgroundBlendMode: "overlay, normal"
        }}>
            <div className="">
                <div onClick={handleBetaTest} className='text-[.8rem] rounded-[25px] border border-gray  center p-[.8rem] gap-2 cursor-pointer hover:scale-95 duration-300'>
                    <p>
                        Join our Beta testers
                    </p>
                    <img src="src/assets/svgs/beta.svg" alt="b" />
                </div>
            </div>
            <h1 className="font-bold grotesk lg:text-xxxl md:text-xxl text-[30px] lg:leading-[110%] leading-tight text-center xl:w-[80%] w-[95%]">
                Advance Transparency in Your Business with Blockchain
            </h1>
            <p className="lg:leading-[32px] md:text-[20px] text-[14px] text-darkGray xl:w-[65%] w-[60%] text-center">
                Stop Fake Products and Choose Ethical Sourcing with Blockchain. Build Strong Trust in the Supply Chain.
            </p>
            <div className="center gap-3">
                <Link to="/profile">
                    <CustomButton onClick={() => {}} background="#2F7AEA" borderRadius="8px" textSize=".9rem" textColor="#FFFFFF" padding="16px 36px">
                        <p>Get Started</p>
                        <div className='beep'></div>
                    </CustomButton>
                </Link>
                <a href='https://youtu.be/_LqzlMXBSEc?si=Pcqt83_oU7c-6ltt' target='_blank'>
                    <CustomButton onClick={() => {}}>
                        <div className="center">
                            <img src="src/assets/images/watch.png" alt="watch" width={40} height={40} />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold">Watch demo</p>
                            <p className="text-darkGray text-left">2 min</p>
                        </div>
                    </CustomButton>
                </a>
            </div>
            <div className="flex justify-between md:flex-row flex-col w-11/12 my-28">
                <div className='ended md:w-[43%] w-full'>
                    <img src="src/assets/images/package.png" alt="package" />
                </div>
                <div className='md:w-[55%] w-full'>
                    <img src="src/assets/images/pick.png" alt="pickup" />
                </div>
            </div>

        </div>
    );
}

export default Hero;
