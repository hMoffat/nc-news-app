import Search from "./Search";
import Topics from "./Topics";
import "./FilterManager.css";

export default function FilterManager({ topics, setTopics, searchesDisabled }) {
  return (
    <div className="filter">
      <Topics topics={topics} setTopics={setTopics} />
      <Search searchesDisabled={searchesDisabled} />
    </div>
  );
}
