import TheFilters from "./components/TheFilters";
import { Filters, Flight } from "./types";
import flights from "./assets/mockFlights.json";
import airplaneIcon from "./assets/icons/airplane-take-off.png";
import { useState } from "react";

function App() {
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);

    const handleChangeFilters = (filters: Filters) => {
        let filtered = flights;

        if (filters.airlines.length) {
            filtered = flights.filter((flight) =>
                filters.airlines.includes(flight.airline)
            );
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(
                (flight) => flight.price <= filters.maxPrice
            );
        }

        if (filters.flightTime.min || filters.flightTime.max) {
            filtered = filtered.filter((flight) => {
                const hour = new Date(flight.flightTime).getHours();
                return (
                    hour >= filters.flightTime.min &&
                    hour < filters.flightTime.max
                );
            });
        }

        setFilteredFlights(filtered);
    };

    return (
        <>
            <h1>Snap trip test</h1>

            <TheFilters onChange={handleChangeFilters} />

            <ul className="flights_list">
                {filteredFlights.map((flight) => {
                    return (
                        <li key={flight.flightTime}>
                            <img src={airplaneIcon} />

                            <div className="w-full">
                                <div className="flex justify-between ">
                                    <h3>{flight.airline}</h3>

                                    <h4>
                                        {new Date(
                                            flight.flightTime
                                        ).toLocaleString()}
                                    </h4>
                                </div>

                                <h4> {flight.price.toLocaleString()}</h4>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {filteredFlights.length === 0 && <h1>No flights found :(</h1>}
        </>
    );
}

export default App;
