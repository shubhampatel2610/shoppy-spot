import React from 'react'
import { Rating } from "primereact/rating";

const StarRating = ({ rating }) => {
  return (
    <span className="flex items-center gap-1">
      <Rating value={rating} readOnly cancel={false} />
      <span className="text-gray-500 text-xs">({rating?.toFixed(1)})</span>
    </span>
  )
}

export default StarRating;