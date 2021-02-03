import React from 'react';

const Rank = ({ username, entries }) => {
  return (
    <>
      <div className='white f3'>
        {`${username}, your current rank is ${entries}`}
      </div>
      <div className='white f1'>
        {'#1'}
      </div>
    </>
  )
}

export default Rank;