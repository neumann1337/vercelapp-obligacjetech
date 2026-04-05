"use client";

import React, { useState, useEffect } from 'react';

export const useGoldPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGoldPrice = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://api.nbp.pl/api/cenyzlota?format=json');
      if (!res.ok) throw new Error('Błąd NBP');
      const data = await res.json();
      setPrice(data[0].cena);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldPrice();
  }, []);

  return { price, loading, error, refetch: fetchGoldPrice };
};

export const useMockCommodityPrice = (basePrice: number) => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMock = () => {
    setLoading(true);
    setTimeout(() => {
      setPrice(basePrice + (Math.random() * 0.5 - 0.25));
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMock();
  }, []);

  return { price, loading, error: false, refetch: fetchMock };
};
