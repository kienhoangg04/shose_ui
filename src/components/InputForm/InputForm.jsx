import { Input } from 'antd';
import React from 'react';
import './styles.scss';

function InputForm(props) {
    const { placeholder = 'Nhập text', handleOnChange, ...rests } = props;
    const handleOnChangeInput = (e) => {
        handleOnChange(e.target.value);
    };
    return (
        <div>
            <Input placeholder={placeholder} valueinput={props.value} onChange={handleOnChangeInput} {...rests} />
        </div>
    );
}

export default InputForm;
