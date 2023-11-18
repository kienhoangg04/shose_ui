import { Table } from 'antd';
import React, { useState } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import './styles.scss';

function TableComponent(props) {
    const { dataTable, columns, handleDeleteMany } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    };
    const handleDelete = () => {
        setIsModalOpen(true);
    };
    const handleOkDelete = () => {
        setIsModalOpen(false);
        handleDeleteMany(rowSelectedKeys);
    };
    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {rowSelectedKeys.length > 1 && (
                <button className="btn__delete" onClick={handleDelete}>
                    Xóa đã chọn
                </button>
            )}

            <Table
                rowSelection={{
                    type: 'check-box',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataTable}
                {...props}
            />
            <ModalComponent
                forceRender
                title="Bạn có muốn xóa?"
                open={isModalOpen}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                <div>Bạn có chắc chắn xóa mục đã chọn?</div>
            </ModalComponent>
        </>
    );
}

export default TableComponent;
