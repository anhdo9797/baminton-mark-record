import React from 'react';
import { Button } from 'antd';

interface PopsButton {
    label: string;
    onClick(): any;
    style: object;
    className: string;
}

const ButtonCustom: React.FC<PopsButton> = ({ label, onClick, className }) => {
    return (
        <Button type="primary" onClick={onClick} className={className}>
            {label}
        </Button>
    );
};

export default ButtonCustom;
