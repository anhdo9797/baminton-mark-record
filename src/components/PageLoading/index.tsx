import React from 'react';
import style from './style.less';

const PageLoading = () => {
    return (
        <div className={style.loading}>
            <div className={style.spiner}>
                <div />
                <div />
            </div>
        </div>
    );
};

export default PageLoading;
