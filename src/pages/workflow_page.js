import React, { useEffect, useRef  } from 'react';

function WorkflowPage() {
  return (
    <iframe
      src={process.env.REACT_APP_TEMPORAL_IO_URL}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Temporal Application"
    ></iframe>
  );

}

export default WorkflowPage;