import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Create event listener to update state
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    // Add event listener
    mediaQuery.addEventListener('change', handler);
    
    // Remove event listener on cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
} 