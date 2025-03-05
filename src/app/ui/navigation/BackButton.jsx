'use client'

export default function BackButton({router, width, heigth}){

    const handleGoBack = () => {
        router.back();
    };

    return (
        <img onClick={handleGoBack} style={{width: width, height: heigth, borderRadius: "50%"}} src="/img/arrow.svg" alt="arrow" />
    );
}