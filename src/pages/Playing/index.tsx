import React, { useState } from 'react';
import { Row, InputNumber } from 'antd';
import { CardEmpty, CardHome } from '@/components/Card/index';

import styles from '../HomePage/styles.less';
import stylesPage from './styles.less';
import { useLocation } from 'umi';

interface PropsSet {
    setValueOnce: any;
    setValueTow: any;
}

const WrapSet: React.FC<PropsSet> = ({ setValueOnce, setValueTow }) => {
    return (
        <Row justify="space-between" className={stylesPage.setTow}>
            <InputNumber
                className={stylesPage.inputType}
                placeholder="Enter points"
                min={1}
                max={30}
                onChange={setValueOnce}
            />
            <p className={stylesPage.set}>set 1</p>
            <InputNumber
                min={1}
                max={30}
                className={stylesPage.inputType}
                placeholder="Enter points"
                onChange={setValueTow}
            />
        </Row>
    );
};

const Playing: React.FC = () => {
    let state = useLocation().state;
    let { playerOnce, playerTow } = state;

    const [valueOce, setValueOnce] = useState();
    const [valueTow, setValueTow] = useState();

    return (
        <div className="container">
            <div className={styles.homePage}>
                <h2>Playing</h2>

                <Row justify="space-between">
                    <CardHome
                        avatar={playerOnce.avatar}
                        name={playerOnce.name}
                        onClick={() => {}}
                        noneToolTip={true}
                    />

                    <h2 className={styles.vs}>VS</h2>

                    <CardHome
                        avatar={playerTow.avatar}
                        name={playerTow.name}
                        onClick={() => {}}
                        noneToolTip={true}
                    />
                </Row>

                <Row justify="space-between" className={stylesPage.setOnce}>
                    <InputNumber
                        className={stylesPage.inputType}
                        placeholder="Enter points"
                        min={1}
                        max={30}
                    />
                    <p className={stylesPage.set}>set 1</p>
                    <InputNumber
                        min={1}
                        max={30}
                        className={stylesPage.inputType}
                        placeholder="Enter points"
                    />
                </Row>

                <WrapSet
                    setValueOnce={setValueOnce}
                    setValueTow={setValueTow}
                />
            </div>
        </div>
    );
};

export default Playing;
