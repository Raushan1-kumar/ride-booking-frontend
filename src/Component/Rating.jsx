import React, { useState } from "react";


function Rating() {
  
const [rating, setRating] = useState(0); // State to store the user's rating

const handleRating = (value) => {
  setRating(value); // Update the rating state
};

return (
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => handleRating(star)}
        className={`text-3xl ${
          star <= rating ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        ★
      </button>
    ))}
  </div>
);
};

export default Rating;
  

