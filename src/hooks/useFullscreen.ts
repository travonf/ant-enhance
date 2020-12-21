import { useState, useEffect } from 'react';

const useFullScreen = (initial = false) => {
  const [fullscreen, setFullscreen] = useState(initial);

  useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);

  return fullscreen;
};

export default useFullScreen;
