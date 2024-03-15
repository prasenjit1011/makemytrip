import React, { useState } from 'react';
import RateModal from './RateModal';

const RateModalWrapper = ({ activityDetailsId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        {showModal && 
        <RateModal activityDetailsId={activityDetailsId} setShowModal={setShowModal} />}
        <button
          className="edinParagraph restFilterBtn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Rate
        </button>
      </div>
    </>
  );
};

export default RateModalWrapper;
