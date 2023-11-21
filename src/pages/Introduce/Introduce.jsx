import React from 'react';
import './styles.scss';
import { Container } from 'react-bootstrap';

function Introduce() {
    return (
        <Container>
            <div className="introduce">
                <h2 className="title">Giới thiệu</h2>
                <div className="introduce__box">
                    <h5 className="introduce__head">
                        breshka -shoes website mua sắm thời trang hàng hiệu trực tuyến hàng đầu việt nam
                    </h5>
                    <p className="introduce__info">
                        Bạn đang tìm kiếm những mẫu thời trang, quần áo, giày dép và phụ kiện mới nhất trên mạng? hãy
                        mua sắm ngay hôm nay tại breshka -shoes!
                    </p>
                    <p className="introduce__text">
                        Breshka-Shoes sẽ mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực
                        tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ
                        hàng đầu cùng với những bộ sưu tập quần áo nam nữ khổng lồ từ giày dép, trang phục, phụ kiện đến
                        mỹ phẩm cho cả phụ nữ và nam giới với những xu hướng thời trang mới nhất. Bạn có thể tìm thấy
                        những bộ trang phục mình muốn từ những bộ đồ ở nhà thật thoải mái hay tự tin trong những bộ
                        trang phục công sở phù hợp. Những trải nghiệm mới chỉ có ở trang mua sắm hàng hiệu trực tuyến
                        Breshka-Shoes.
                    </p>
                </div>
                <div className="introduce__box">
                    <h5 className="introduce__head">breshka -shoes món quà tặng người thân thật ý nghĩa!</h5>
                    <p className="introduce__text">
                        Breshka-Shoes sẽ gợi ý cho bạn những món quà thật ý nghĩa để tặng người thân, bạn bè. Chúng tôi
                        sẽ làm bạn hài lòng với sự lựa chọn của mình bằng giá tốt nhất và chất lượng dịch vụ hoàn hảo
                        của Breshka-Shoes.
                    </p>
                </div>
                <div className="introduce__box">
                    <h5 className="introduce__head">
                        mua sắm ở breshka -shoes phù hợp với túi tiền từ doanh nhân, nhân viên văn phòng đến các bạn trẻ
                    </h5>
                    <p className="introduce__text">
                        Breshka-Shoes luôn cập nhật những xu hướng thời trang phong cách nhất từ những hãng thời trang
                        cao cấp như Lime Orange hoặc Alachic, những đôi giày nổi tiếng mà giá cả phải chăng như Me Girl
                        hoặc Bandolini, Juno, JShoes cho tới các thương hiệu thời trang tầm trung như Lotus Shoes và
                        Mollet, Lithe S, Om Shoes tất cả đều có ở Breshka-Shoes. Đặc biệt, Breshka-Shoes còn có nhiều
                        đợt khuyến mãi, giảm giá đặc biệt với giá tốt nhất. Thời trang hàng hiệu chất lượng cao, phù hợp
                        túi tiền - chỉ có ở Breshka-Shoes!
                    </p>
                </div>
                <div className="introduce__box">
                    <h5 className="introduce__head">
                        phong cách mua sắm hiện đại - thuận tiện, thanh toán an toàn - dễ dàng
                    </h5>
                    <p className="introduce__text">
                        Bạn có thể mua sắm thoải mái trên Breshka-Shoes mà không có bất kỳ lo lắng nào: trả hàng trong
                        vòng 30 ngày kể từ ngày nhận hàng. Nếu bạn có bất kì câu hỏi nào về các sản phẩm của chúng tôi
                        từ quần áo nam, trang phục nữ, mỹ phẩm nam hay trang sức hãy gọi ngay tới bộ phận chăm sóc khách
                        hàng.
                    </p>
                </div>
            </div>
        </Container>
    );
}

export default Introduce;
