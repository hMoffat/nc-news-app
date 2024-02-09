import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTopics } from "../../../api/api";

export default function Topics({ topics, setTopics }) {
  const { topic } = useParams();
  const [selectTopic, setSelectTopic] = useState(topic ? topic : "Select...");
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectReminder, setSelectReminder] = useState(false);

  useEffect(() => {
    setSelectReminder(false);
    if (topic === selectTopic) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectTopic]);

  useEffect(() => {
    fetchTopics()
      .then((response) => {
        const fetchedTopics = response.data.topics;
        setTopics(fetchedTopics);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (event) => {
    setSelectTopic(event.target.value);
  };

  const handleTopicSubmit = (event) => {
    event.preventDefault();

    if (selectTopic === "Select...") {
      setSelectReminder(true);
    }

    if (selectTopic !== "Select..." && selectTopic !== topic) {
      setIsDisabled(true);
      navigate(`/topics/${selectTopic}`);
    }
  };

  return (
    <div className="topic">
      <form className="select-topic" onSubmit={handleTopicSubmit}>
        <label htmlFor="topic-dropdown">Select a topic: </label>
        <select
          id="topic-dropdown"
          defaultValue={topic}
          onChange={handleSelect}
        >
          <option value="Select..." key="select">
            Select...
          </option>
          {topics.map((aTopic) => {
            return (
              <option value={aTopic.slug} key={aTopic.slug}>
                {aTopic.slug}
              </option>
            );
          })}
        </select>
        <button type="submit" disabled={isDisabled}>
          Go to topic
        </button>
        {selectReminder ? <p>You need to choose a topic</p> : null}
      </form>
    </div>
  );
}
