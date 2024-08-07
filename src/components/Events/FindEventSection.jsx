import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import EventItem from "./EventItem.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, error, isPending, isLoading, isError } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    //untill the serach term is not undefined prevent the query from running
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });

    //isPending will not be true when the query is disabled.
  //isLoading  => when the data is being fetched (default value is false)
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value); // Update the search term
  }
  console.log("data", data, searchTerm);
  let content = <p>Please enter a search term to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch data."}
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
