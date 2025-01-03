import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CartSidebar = ({ onClose }) => {
  const popupRef = useRef(null);
  const router = useRouter();
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
    toast.info('Updated quantity');
  };


  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [handleQuantityChange]);

  const cartPage = () => {
    onClose();
    router.push('/cart');
  }
  const checkoutPage = () => {
    onClose();
    router.push('/checkout');
    return;
  }


  return (
    <>
      {/* Cart sidebar */}
      <div className="bb-side-cart-overlay  w-full h-screen fixed top-[0] left-[0] bg-[#00000080] z-[17]" />
      <div className="bb-side-cart w-[770px] h-[calc(100%-30px)] my-[15px] ml-[15px] pt-[15px] px-[8px] text-[14px] font-normal fixed z-[17] top-[0] right-[0] left-[auto] block transition-all duration-[0.5s] ease delay-[0s] translate-x-[100%] bg-[#fff] overflow-auto opacity-[0] rounded-tl-[20px] rounded-bl-[20px] max-[991px]:w-[740px] max-[767px]:w-[350px] max-[575px]:w-[300px] bb-open-cart">
        <div className="flex flex-wrap h-full" ref={popupRef}>
          <div className="min-[768px]:w-[41.66%] w-full px-[12px] max-[767px]:hidden">
            <div className="bb-top-contact">
              <div className="bb-cart-title w-full mb-[20px] flex flex-wrap justify-between">
                <h4 className="font-quicksand text-[18px] font-extrabold text-[#3d4750] tracking-[0.03rem] leading-[1.2]">
                  Related Items
                </h4>
              </div>
            </div>
            <div className="bb-cart-box cart-related bb-border-right flex flex-col pr-[24px] border-r-[1px] border-solid border-[#eee] overflow-auto mb-[-24px]">
              <div className="bb-deal-card mb-[24px]">
                <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                  <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                    <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                      <span className="text-[14px] text-[#777] font-medium uppercase">
                        Hot
                      </span>
                    </span>
                    <a >
                      <div className="inner-img relative block overflow-hidden rounded-tl-[20px] rounded-tr-[20px]">
                        <img
                          className="main-img transition-all duration-[0.3s] ease delay-[0s] max-w-full"
                          src="https://printhutt.com/media/custom-name-lemp.png"
                          alt="product-2"
                        />
                        <img
                          className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                          src="https://printhutt.com/media/custom-name-lemp.png"
                          alt="product-2"
                        />
                      </div>
                    </a>
                    <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                      <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                        <a
                          
                          title="Wishlist"
                          className="w-[35px] h-[35px] flex items-center justify-center"
                        >
                          <i className="ri-heart-line text-[18px] text-[#777] leading-[10px]" />
                        </a>
                      </li>
                      <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                        <a
                          
                          title="Quick View"
                          className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                        >
                          <i className="ri-eye-line text-[18px] text-[#777] leading-[10px]" />
                        </a>
                      </li>
                      <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                        <a
                          href="compare.html"
                          title="Compare"
                          className="w-[35px] h-[35px] flex items-center justify-center"
                        >
                          <i className="ri-repeat-line text-[18px] text-[#777] leading-[10px]" />
                        </a>
                      </li>
                      <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                        <a
                          
                          title="Add To Cart"
                          className="w-[35px] h-[35px] flex items-center justify-center"
                        >
                          <i className="ri-shopping-bag-4-line text-[18px] text-[#777] leading-[10px]" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="bb-pro-contact p-[20px]">
                    <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                      <a
                        href="shop-left-sidebar-col-3.html"
                        className="font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                      >
                        Juice
                      </a>
                      <span className="bb-pro-rating">
                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                        <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                      </span>
                    </div>
                    <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                      <a
                        href="product-left-sidebar.html"
                        className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                      >
                        Organic Apple Juice Pack
                      </a>
                    </h4>
                    <div className="bb-price flex flex-wrap justify-between">
                      <div className="inner-price mx-[-3px]">
                        <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                          ₹15
                        </span>
                        <span className="item-left px-[3px] text-[14px] text-[#6c7fd8]">
                          3 Left
                        </span>
                      </div>
                      <span className="last-items text-[14px] text-[#6c7fd8]">
                        100 ml
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bb-cart-banner mb-[24px]">
                <div className="banner rounded-[20px] relative overflow-hidden">
                  <img
                    src="https://printhutt.com/media/custom-name-lemp.png"
                    alt="cart-banner"
                    className="w-full transition-all duration-[0.3s] ease-in-out"
                  />
                  <div className="detail w-full p-[15px] absolute left-[0] bottom-[0] bg-[#000000b3] flex flex-col">
                    <h4 className="font-Poppins text-[15px] mb-[5px] leading-[22px] font-light text-[#fff] tracking-[0.03rem]">
                      Neon &amp; Light
                    </h4>
                    <h3 className="font-quicksand font-semibold tracking-[0.03rem] text-[#fff] text-[22px] leading-[30px]">
                      Customize
                    </h3>
                    <a
                      href="shop-left-sidebar-col-3.html"
                      className="transition-all duration-[0.3s] ease-in-out w-[100px] mt-[15px] py-[5px] px-[10px] border-[1px] border-solid border-[#fff] rounded-[10px] text-[#fff] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem] flex items-center justify-center hover:bg-[#fff] hover:text-[#3d4750]"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-[768px]:w-[58.33%] w-full px-[12px]">
            <div className="bb-inner-cart relative z-[9] flex flex-col h-full justify-between">
              <div className="bb-top-contact">
                <div className="bb-cart-title w-full mb-[20px] flex flex-wrap justify-between">
                  <h4 className="font-quicksand text-[18px] font-extrabold text-[#3d4750] tracking-[0.03rem] leading-[1.2]">
                    My cart
                  </h4>
                  <a
                    onClick={onClose}
                    className="bb-cart-close transition-all duration-[0.3s] ease-in-out w-[16px] h-[20px] absolute top-[-20px] right-[0] bg-[#e04e4eb3] rounded-[10px] cursor-pointer"
                    title="Close Cart"
                  />
                </div>
              </div>
              <div className="bb-cart-box item h-full flex flex-col max-[767px]:justify-start">
                <ul className="bb-cart-items mb-[-24px]">

                  {items.length === 0 ? (
                    <li className="cart-sidebar-list mb-[24px] p-[20px] flex bg-[#f8f8fb] rounded-[20px] border-[1px] border-solid border-[#eee] relative max-[575px]:p-[10px]">
                      Your cart is empty
                    </li>
                  ) : (
                    items.map(item => (
                      <li className="cart-sidebar-list mb-[24px] p-[20px] flex bg-[#f8f8fb] rounded-[20px] border-[1px] border-solid border-[#eee] relative max-[575px]:p-[10px]" key={item._id}>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="cart-remove-item transition-all duration-[0.3s] ease-in-out bg-[#3d4750] w-[20px] h-[20px] text-[#fff] absolute top-[-3px] right-[-3px] rounded-[50%] flex items-center justify-center opacity-[0.5] text-[15px]"
                        >
                          <i className="ri-close-line" />
                        </button>
                        <Link href={`/product-details/${item.slug}`}

                          className="bb-cart-pro-img flex grow-[1] shrink-[0] basis-[25%] items-center max-[575px]:flex-[initial]"
                        >
                          <Image
                            src={item.thumbnail.url}
                            alt={item.title}
                            width={100} height={100}
                            className="w-[85px] rounded-[10px] border-[1px] border-solid border-[#eee] max-[575px]:w-[50px]"
                          />
                        </Link>
                        <div className="bb-cart-contact pl-[15px] relative grow-[1] shrink-[0] basis-[70%] overflow-hidden">
                          <a
                            href="product-left-sidebar.html"
                            className="bb-cart-sub-title w-full mb-[8px] font-Poppins tracking-[0.03rem] text-[#3d4750] whitespace-nowrap overflow-hidden text-ellipsis block text-[14px] leading-[18px] font-medium"
                          >
                            {item.title}
                          </a>
                          <span className="cart-price mb-[8px] text-[14px] leading-[18px] block font-Poppins text-[#686e7d] font-light tracking-[0.03rem]">
                            <span className="new-price px-[3px] text-[15px] leading-[18px] text-[#686e7d] font-bold">
                              ₹{item.price}
                            </span>
                          </span>

                          <div className="qty-plus-minus h-[28px] w-[85px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                            <div className="dec bb-qtybtn" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</div>
                            <input
                              className="qty-input text-center"
                              type="text"
                              name="bb-qtybtn"
                              min="1"
                              readOnly
                              value={item.quantity}
                            />
                            <div className="inc bb-qtybtn" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</div>
                          </div>
                        </div>
                      </li>
                    )))}
                </ul>
              </div>
              <div className="bb-bottom-cart">
                <div className="cart-sub-total mt-[20px] pb-[8px] flex flex-wrap justify-between border-t-[1px] border-solid border-[#eee]">
                  <table className="table cart-table mt-[10px] w-full align-top">
                    <tbody>
                      <tr>
                        <td className="title font-medium text-[#777] p-[.5rem]">
                          Sub-Total :
                        </td>
                        <td className="price text-[#777] text-right p-[.5rem]">
                          ₹{totalPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="title font-medium text-[#777] p-[.5rem]">
                          Shipping :
                        </td>
                        <td className="price text-[#777] text-right p-[.5rem]">
                          Free
                        </td>
                      </tr>
                      <tr>
                        <td className="title font-medium text-[#777] p-[.5rem]">
                          Total :
                        </td>
                        <td className="price text-[#777] text-right p-[.5rem]">
                          ₹{totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cart-btn flex justify-between mb-[20px]">
                  <button
                    onClick={cartPage }
                    className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[5px] px-[15px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={checkoutPage}
                    className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[5px] px-[15px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
