import React from 'react';
import { Button } from 'antd';
import styles from './styles.scss';

interface PopsButton {
    label: string;
    onClick(): any;
    style: object;
}

const ButtonCustom: React.FC<PopsButton> = ({ label, onClick, style }) => {
    return (
        <Button className={styles.myButton} onClick={onClick} style={style}>
            {label}
        </Button>
    );
};

export default ButtonCustom;
