import { GridContent } from '@ant-design/pro-layout';
import React from 'react';
import { IRouteComponentProps } from 'umi';
import style from './index.less';

const BasicLayout = ({ children }: IRouteComponentProps) => {
    return (
        <GridContent contentWidth="Fixed" className={style.layoutContainer}>
            {children}
        </GridContent>
    );
};

export default BasicLayout;
