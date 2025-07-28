import React, { useEffect, useState } from 'react';

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Render nothing on the server or until client-side hydration
  }

  return <>{children}</>;
};

export default ClientOnly;
