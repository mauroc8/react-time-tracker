import { useState, useEffect } from "react";

export function useWillUnmount() {
  const [willUnmount, setWillUnmount] = useState(false);

  useEffect(() => {
    return () => setWillUnmount(true);
  }, []);

  return willUnmount;
}
