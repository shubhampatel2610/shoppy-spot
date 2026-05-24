import React from 'react'
import { useNavigate } from 'react-router-dom';
import StarRating from '../common/StarRating';

const ProductCard = (props) => {
    const { product } = props;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
        >
            {/* Image */}
            <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 p-3"
                />
            </div>

            {/* Info */}
            <div className="p-3 border-t border-gray-50">
                <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <StarRating rating={product.rating} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard;