import React from 'react';
import './styles.scss';

function OrderPage() {
    return (
        <div className="order__box">
            <h1 className="title">Đơn hàng của bạn</h1>
            <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                <div className="table overflow-x-auto">
                    <table className="table__order">
                        <thead>
                            <tr>
                                <th>Đơn hàng</th>
                                <th>Ngày</th>
                                <th>Địa chỉ</th>
                                <th>Giá trị đơn hàng</th>
                                <th>TT thanh toán</th>
                                <th>TT vận chuyển</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    <p>Không có đơn hàng nào</p>
                                </td>
                                {/* <td>a</td>
                                <td>b</td>
                                <td>c</td>
                                <td>d</td>
                                <td>d</td>
                                <td>d</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
