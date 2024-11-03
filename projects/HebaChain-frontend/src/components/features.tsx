import React from 'react';
import CustomButton from './common/button';
import { FeaturesUtils } from '../utils/features';

interface FeatureData {
    icon: string;
    heading: string;
    paragraph: string;
}

const Features: React.FC = () => {
    return (
        <div className='flex-col center gap-16 w-10/12 my-10'>
            <div className="center">
                <CustomButton onClick={() => {}} textSize=".8rem" borderRadius="25px" border="1px solid rgba(0, 0, 0, 0.10)">Product Features</CustomButton>
            </div>

            <div className='center gap-16 flex-wrap'>
                {FeaturesUtils.map((feat: FeatureData, index: number) => (
                    <div key={index} className='md:w-[45%] w-10/12 center flex-col gap-4'>
                        <div className='center'>
                            <img src={feat.icon} alt="icon" />
                        </div>
                        <h3 className='font-semibold text-md text-center'>{feat.heading}</h3>
                        <p className='text-darkGray text-center min-h-[100px]'>{feat.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Features;
