// import PropTypes from 'prop-types'
// import { ScaleLoader } from 'react-spinners'

// const LoadingSpinner = ({ smallHeight }) => {
//   return (
//     <div
//       className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
//       flex 
//       flex-col 
//       justify-center 
//       items-center `}
//     >
//       <ScaleLoader size={100} color='lime' />
//     </div>
//   )
// }

// LoadingSpinner.propTypes = {
//   smallHeight: PropTypes.bool,
// }

// export default LoadingSpinner
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'react-spinners';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFD700']; // Array of colors

const LoadingSpinner = ({ smallHeight }) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 200); // Change color every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color={colors[colorIndex]} />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
