import { GridContent } from '@ant-design/pro-layout';
import React from 'react';
import { IRouteComponentProps } from 'umi';

const BasicLayout = ({ children }: IRouteComponentProps) => {
    return <GridContent contentWidth="Fixed">{children}</GridContent>;
};

export default BasicLayout;
