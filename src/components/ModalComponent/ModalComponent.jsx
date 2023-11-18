import { Modal } from 'antd';
import React from 'react';

function ModalComponent(props) {
    const { children, title = 'Modal', ...rests } = props;
    return (
        <Modal title={title} {...rests}>
            {children}
        </Modal>
    );
}

export default ModalComponent;
