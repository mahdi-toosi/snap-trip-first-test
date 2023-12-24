import { useState, type ChangeEvent, useMemo } from "react";
import type { Filters } from "../types";

import flights from "../assets/mockFlights.json";

interface Props {
    onChange: (filters: Filters) => void;
}

function AppFilters({ onChange }: Props) {
    const initialVal = {
        maxPrice: 0,
        airlines: [],
        flightTimeLabel: "" as Filters["flightTimeLabel"],
        flightTime: { min: 0, max: 0 },
    };
    const [filters, setFilters] = useState<Filters>(initialVal);

    const airlines = useMemo(() => {
        return [...new Set(flights.map((f) => f.airline))];
    }, []);

    const { minPrice, maxPrice } = useMemo(() => {
        return flights.reduce(
            (acc, flight) => {
                if (flight.price < acc.minPrice) acc.minPrice = flight.price;
                if (flight.price > acc.maxPrice) acc.maxPrice = flight.price;
                return acc;
            },
            { minPrice: Infinity, maxPrice: -Infinity }
        );
    }, []);

    const handleAirlineChange = (airline: string) => {
        let airlines: Filters["airlines"];
        if (filters.airlines.includes(airline)) {
            airlines = filters.airlines.filter((a) => a !== airline);
        } else {
            airlines = [...filters.airlines, airline];
        }
        setFilters((prev) => ({ ...prev, airlines }));
    };

    const handleMaxPriceChange = (value: number) => {
        setFilters((prev) => ({ ...prev, maxPrice: value }));
    };

    const handleFlightTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const a = {
            dawn: { min: 0, max: 6 },
            morning: { min: 6, max: 12 },
            noon: { min: 12, max: 18 },
            night: { min: 18, max: 24 },
        } as Record<Filters["flightTimeLabel"], Filters["flightTime"]>;

        const flightTimeLabel = event.target
            .value as Filters["flightTimeLabel"];

        setFilters((prev) => ({
            ...prev,
            flightTimeLabel,
            flightTime: a[flightTimeLabel],
        }));
    };

    const handleReset = () => {
        setFilters(() => ({ ...initialVal }));
    };

    const handleFilter = () => {
        onChange(filters);
    };

    return (
        <section className="filters_wrapper">
            <div>
                <label className="block">airlines:</label>
                {airlines.map((airline) => (
                    <label key={airline}>
                        <input
                            type="checkbox"
                            checked={filters.airlines.includes(airline)}
                            onChange={() => handleAirlineChange(airline)}
                        />
                        {airline}
                    </label>
                ))}
            </div>

            <div>
                <label>max price:</label>
                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={10000}
                    value={filters.maxPrice}
                    onChange={(e) => handleMaxPriceChange(+e.target.value)}
                />
                {filters.maxPrice.toLocaleString()}
            </div>

            <div>
                <label>time:</label>
                <select
                    value={filters.flightTimeLabel}
                    onChange={handleFlightTimeChange}
                >
                    <option value="">choose</option>
                    <option value="dawn">Dawn 24 - 6</option>
                    <option value="morning">Morning 6 - 12</option>
                    <option value="noon">Noon 12 - 18</option>
                    <option value="night">Night 18 - 24</option>
                </select>
            </div>

            <div>
                <button onClick={handleReset}>reset</button>

                <button onClick={handleFilter}>search</button>
            </div>
        </section>
    );
}

export default AppFilters;
