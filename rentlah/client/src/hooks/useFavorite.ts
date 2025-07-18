import { useState, useEffect, useCallback } from 'react';
import { authClient } from "@/lib/authClient";

export function useFavorite(propertyId: string) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the property is favorited
  const checkFavoriteStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/favorites/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  // Toggle favorite status
  const toggleFavorite = async () => {
    // Check if user is logged in
    const session = (await authClient.getSession()).data;
    
    if (!session?.user) {
      alert('Please sign in to save favorites');
      return;
    }

    try {
      setLoading(true);
      if (isFavorited) {
        // Remove from favorites
        await fetch(`/api/favorites/${propertyId}`, {
          method: 'DELETE',
        });
        setIsFavorited(false);
      } else {
        // Add to favorites
        await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyId }),
        });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check favorite status on mount
  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  return { isFavorited, loading, toggleFavorite };
}
