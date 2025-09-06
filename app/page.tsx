
"use client";

import { useState, useEffect } from "react";
import { Hero, SearchBar, CustomFilter, CarCard } from '@/components';
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps, FilterProps } from "@/types";

export default function Home(){
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterProps>({
    manufacturer: "",
    year: 0,
    fuel_type: "",
    limit: 10,
  });

  const getCars = () => {
    setLoading(true);
    try {
      const result = fetchCars(filters);
      setAllCars(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [filters]);

  const updateSearchParams = (type: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
   <main className="overflow-hidden">
    <Hero />

    <div className="mt-12 padding-x padding-y max-width" id="discover">
       <div className="home__text-container">
         <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
         <p>Explore the cars you might like</p>
       </div>

       <div className="home__filters">
          <SearchBar setManufacturer={(value) => updateSearchParams("manufacturer", value)} />

          <div className="home__filter-container">
            <CustomFilter 
              title="fuel" 
              options={fuels} 
              setFilter={(value) => updateSearchParams("fuel_type", value)} 
            />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction} 
              setFilter={(value) => updateSearchParams("year", value)} 
            />
          </div>
       </div>

       {loading ? (
         <div className="home__error-container">
           <h2 className="text-black text-xl font-bold">Loading...</h2>
         </div>
       ) : !allCars || allCars.length < 1 ? (
         <div className="home__error-container">
           <h2 className="text-black text-xl font-bold">Oops, no results</h2>
           <p>No cars found with the current filters</p>
         </div>
       ) : (
         <section>
           <div className="home__cars-wrapper">
             {allCars?.map((car) => (
               <CarCard key={`${car.make}-${car.model}-${car.year}`} car={car} />
             ))}
           </div>
         </section>
       )}
    </div>
   </main>
  )
}
