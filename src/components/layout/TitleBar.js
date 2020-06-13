import React from 'react';

const TitleBar = () => {
    return (
        <>
            <h1 className="title">
                국내 자동차 견적 서비스
            </h1>
            <p className="description">
                가장 <span style={{fontSize:18, fontWeight:800}}>좋은 조건</span>으로 원하신다면 바로 <span style={{fontSize:18, fontWeight:800}}>지금</span> 견적 <span style={{fontSize:18, fontWeight:800}}>신청</span> 하세요.
            </p>
        </>
    );
};

export default TitleBar;