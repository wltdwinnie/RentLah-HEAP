"use client";

import { useState, useEffect } from 'react';
import { authClient } from "@/lib/authClient";
import { PropertyCard } from '@/components/ui/card';
import type { Listing } from '@/lib/definition';

export default function SavedPropertiesPage() {
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        // Check if user is logged in
        const session = (await authClient.getSession()).data;
        
        if (!session?.user) {
          setError("You must be logged in to view saved properties");
          setLoading(false);
          return;
        }
        
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError("Failed to load saved properties");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading your saved properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-500">You haven't saved any properties yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
