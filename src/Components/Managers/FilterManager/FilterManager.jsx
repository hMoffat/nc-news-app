import Search from "./Search";
import Topics from "./Topics";
import { filterManager } from "./filterManager.module.css";
import { homePage__filterArea } from "../../pages/HomePage.module.css";

export default function FilterManager({ topics, setTopics, searchesDisabled }) {
  return (
    <div className={`${homePage__filterArea} ${filterManager}`}>
      <Topics topics={topics} setTopics={setTopics} />
      <Search searchesDisabled={searchesDisabled} />
    </div>
  );
}
