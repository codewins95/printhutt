import React from "react";
import Slider from "react-slick";


const ProductImageSlider = () => {
  const baseUrl ="https://react-slick.neostack.com/img/react-slick/"
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* <div className="single-pro-slider sticky top-[0] p-[15px] border-[1px] border-solid border-[#eee] rounded-[24px] max-[991px]:max-w-[500px] max-[991px]:m-auto">
      <div className="single-product-cover">
        <div className="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]">
          <img
            className="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
            src="https://printhutt.com/media/product/283713037_LED%20Name%20Plate%20For%20Home.jpg"
            alt="product-1"
          />
        </div>
        <div className="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]">
          <img
            className="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
            src="https://printhutt.com/media/product/709876482_Untitled%20design.png"
            alt="product-2"
          />
        </div>
        <div className="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]">
          <img
            className="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
            alt="product-3"
          />
        </div>
        <div className="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]">
          <img
            className="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
            src="https://printhutt.com/media/product/386235202_800658968_74.jpg"
            alt="product-4"
          />
        </div>
        <div className="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]">
          <img
            className="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
            src="https://printhutt.com/media/product/671800533_3d-good-vibe.jpg"
            alt="product-5"
          />
        </div>
      </div>
      <div className="single-nav-thumb w-full overflow-hidden">
        <div className="single-slide px-[10px] block">
          <img
            className="img-responsive border-[1px] border-solid border-transparent transition-all duration-[0.3s] ease delay-[0s] cursor-pointer rounded-[15px]"
            src="https://printhutt.com/media/product/283713037_LED%20Name%20Plate%20For%20Home.jpg"
            alt="product-1"
          />
        </div>
        <div className="single-slide px-[10px] block">
          <img
            className="img-responsive border-[1px] border-solid border-transparent transition-all duration-[0.3s] ease delay-[0s] cursor-pointer rounded-[15px]"
            src="https://printhutt.com/media/product/709876482_Untitled%20design.png"
            alt="product-2"
          />
        </div>
        <div className="single-slide px-[10px] block">
          <img
            className="img-responsive border-[1px] border-solid border-transparent transition-all duration-[0.3s] ease delay-[0s] cursor-pointer rounded-[15px]"
            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
            alt="product-3"
          />
        </div>
        <div className="single-slide px-[10px] block">
          <img
            className="img-responsive border-[1px] border-solid border-transparent transition-all duration-[0.3s] ease delay-[0s] cursor-pointer rounded-[15px]"
            src="https://printhutt.com/media/product/386235202_800658968_74.jpg"
            alt="product-4"
          />
        </div>
        <div className="single-slide px-[10px] block">
          <img
            className="img-responsive border-[1px] border-solid border-transparent transition-all duration-[0.3s] ease delay-[0s] cursor-pointer rounded-[15px]"
            src="https://printhutt.com/media/product/671800533_3d-good-vibe.jpg"
            alt="product-5"
          />
        </div>
      </div>
    </div> */}
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={baseUrl + "/abstract01.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract02.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract03.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract04.jpg"} />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default ProductImageSlider;
