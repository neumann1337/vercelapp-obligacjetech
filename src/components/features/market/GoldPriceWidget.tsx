"use client";

import React, { useState, useEffect } from 'react';
import { Coins, Layers, Gem, TrendingUp } from 'lucide-react';

const useGoldPriceInternal = () => {
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

const useMockCommodityPrice = (basePrice: number) => {
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

interface CommodityTileProps {
  title: string;
  unit: string;
  source: string;
  price: number | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
  icon: any;
  colorClass: string;
  bgGlowClass: string;
}

const CommodityTile = ({
  title,
  unit,
  source,
  price,
  loading,
  error,
  refetch,
  icon: Icon,
  colorClass,
  bgGlowClass
}: CommodityTileProps) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default w-full">
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${bgGlowClass}`} />

      <div className="flex justify-between items-start relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-500 transition-colors">
          {title} ({unit})
        </p>
        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-100 shadow-sm transition-all duration-300">
          <Icon size={18} strokeWidth={2.5} className={`${colorClass} opacity-80 group-hover:scale-110 transition-transform`} />
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        {loading ? (
          <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse" />
        ) : error ? (
          <div className="flex flex-col items-start gap-1.5 bg-red-50 p-2 rounded-xl border border-red-100 w-fit">
            <span className="text-[10px] text-red-600 font-black uppercase tracking-wider">Błąd API</span>
            <button 
              onClick={(e) => { e.preventDefault(); refetch(); }} 
              className="text-[10px] text-red-500 hover:text-red-700 underline font-bold transition-colors"
            >
              Ponów
            </button>
          </div>
        ) : (
          <div className="flex items-baseline gap-1 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
            <span className="text-3xl font-black tracking-tighter tabular-nums">
              {price?.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-sm font-black opacity-60">PLN</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center relative z-10 mt-2">
        <p className="text-[10px] text-gray-400 font-bold truncate uppercase tracking-widest leading-none">
          {source}
        </p>
        {!loading && !error && (
          <TrendingUp size={12} strokeWidth={3} className={`${colorClass} opacity-0 group-hover:opacity-100 transition-opacity`} />
        )}
      </div>
    </div>
  );
};

export const GoldPriceWidget = () => {
  const gold = useGoldPriceInternal();
  const silver = useMockCommodityPrice(3.95);
  const platinum = useMockCommodityPrice(125.50);

  return (
    <section className="w-full mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200 text-gray-900">
          <Gem size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-gray-900">
            Rynek Surowców
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
            Metale szlachetne (Kruszce)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 md:gap-5 w-full">
        
        <CommodityTile 
          title="Złoto"
          unit="1g"
          source="Notowania NBP"
          price={gold.price}
          loading={gold.loading}
          error={gold.error}
          refetch={gold.refetch}
          icon={Coins}
          colorClass="text-yellow-500"
          bgGlowClass="bg-yellow-100"
        />

        <CommodityTile 
          title="Srebro"
          unit="1g"
          source="Dane szacunkowe"
          price={silver.price}
          loading={silver.loading}
          error={silver.error}
          refetch={silver.refetch}
          icon={Layers}
          colorClass="text-slate-500"
          bgGlowClass="bg-slate-200"
        />

        <CommodityTile 
          title="Platyna"
          unit="1g"
          source="Dane szacunkowe"
          price={platinum.price}
          loading={platinum.loading}
          error={platinum.error}
          refetch={platinum.refetch}
          icon={Gem}
          colorClass="text-purple-500"
          bgGlowClass="bg-purple-100"
        />

      </div>
    </section>
  );
};

export default GoldPriceWidget;