import React from 'react';

const Rank = ({ username, entries }) => {
  return (
    <>
      <div className='white f3'>
        {`${username}, your current entry count is `}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </>
  )
}

export default Rank;