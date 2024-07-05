import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";

const ProductCard = (props) => {
  return (
    <div>
      {props.productName}
    </div>
  );
};

export default ProductCard;