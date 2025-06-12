import {
  Checkbox,
  Radio,
  Select,
  Textarea,
  TextField,
} from "./input/Input.jsx";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const pollListStyle = {
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  gap: "10px",
};

const pollItemStyle = {
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "row",
  listStyle: "none",
  gap: "10px",
};

const PollContext = createContext({
  answers: [],
  chosenAnswer: () => {},
});

export const PollList = ({ title, description, pollItemList }) => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    setAnswers(() => {
      return pollItemList.map(({ id, required }) => ({
        id,
        required,
        answer: [],
      }));
    });
  }, [pollItemList]);

  const pollValue = {
    answers,
    chosenAnswer: (id, value, type, checked) => {
      setAnswers((prevState) => {
        return prevState.map((item) => {
          if (item.id === id) {
            if (!value) {
              item.answer = [];
            } else {
              if (checked === true || checked === undefined) {
                if (type === "radio") {
                  item.answer = [value];
                }
                if (!item.answer.includes(value)) {
                  item.answer.push(value);
                }
              } else if (checked === false) {
                item.answer = item.answer.filter((a) => a !== value);
              }
            }
          }
          return item;
        });
      });
    },
  };

  const submissionHandler = () => {
    const unansweredRequiredPoll = answers.filter(
      (item) => item.required && item.answer.length === 0
    );

    if (unansweredRequiredPoll.length > 0) {
      alert("필수 문항을 선택하지 않았습니다.");
      return;
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <ul style={pollListStyle}>
        <PollContext.Provider value={pollValue}>
          {pollItemList.map((item) => (
            <PollItem key={item.id} item={item} max={item.max} />
          ))}
        </PollContext.Provider>
      </ul>
      <button type="button" onClick={submissionHandler}>
        제출
      </button>
    </div>
  );
};

export const PollItem = ({ item, max }) => {
  const { id, number, title, type, answers, required, options = [] } = item;
  const pollItemRef = useRef([]);

  const [checked, setChecked] = useState(
    answers.map((item) => ({ id: item.id, checked: false }))
  );

  const { chosenAnswer } = useContext(PollContext);

  const changeHandler = (event) => {
    const target = event.target ?? event;
    const dataset = target.dataset;

    if (type === "checkbox" || type === "radio") {
      const count = checked.filter((item) => item.checked).length;
      if (count >= max && target.checked) {
        target.checked = false;
        alert("더 이상 선택할 수 없습니다.");
        return;
      }
    }

    chosenAnswer(id, target.value, dataset.inputType, target.checked);
    setChecked((prevState) => {
      if (dataset.inputType === "radio") {
        return prevState.map((c) => {
          c.checked = false;
          if (c.id === dataset.id) {
            c.checked = target.checked;
          }
          return c;
        });
      } else if (dataset.inputType === "checkbox") {
        const newState = JSON.parse(JSON.stringify(prevState));

        pollItemRef.current.forEach((elem, index) => {
          newState[index].checked = elem.checked;
        });

        return newState;
      }
    });
  };

  return (
    <li>
      <div style={{ color: required ? "#f00" : "inherite" }}>
        <span style={{ marginRight: "10px" }}>{number}.</span>
        <span>{title}</span> {required ? "(필수) " : ""}{" "}
        {max > 1 && <span>최대 {max}개 선택</span>}
      </div>
      <ul style={pollItemStyle}>
        {answers.map(({ id, name, title, value }, index) => (
          <PollAnswer
            key={id}
            ref={(element) => (pollItemRef.current[index] = element)}
            id={id}
            type={type}
            name={name}
            title={title}
            value={value}
            checked={checked}
            options={options}
            changeHandler={changeHandler}
          />
        ))}
      </ul>
    </li>
  );
};

const PollAnswer = ({
  ref,
  id,
  type,
  name,
  title,
  value,
  checked,
  options,
  changeHandler,
}) => {
  return (
    <li>
      {type === "text" ? (
        <TextField
          ref={ref}
          id={id}
          labelText={title}
          name={name}
          value={value}
          onChange={changeHandler}
        />
      ) : type === "checkbox" ? (
        <Checkbox
          ref={ref}
          id={id}
          labelText={title}
          name={name}
          value={value}
          checked={checked.find((e) => e.id === id).checked}
          onChange={changeHandler}
        />
      ) : type === "radio" ? (
        <Radio
          ref={ref}
          id={id}
          labelText={title}
          name={name}
          value={value}
          checked={checked.find((e) => e.id === id).checked}
          onChange={changeHandler}
        />
      ) : type === "select" ? (
        <Select
          ref={ref}
          id={id}
          labelText={title}
          name={name}
          value={value}
          onChange={changeHandler}
          withDefault={true}
          options={options}
        />
      ) : type === "textarea" ? (
        <Textarea
          ref={ref}
          id={id}
          labelText={title}
          name={name}
          value={value}
          onChange={changeHandler}
        />
      ) : (
        <input type="text" />
      )}
    </li>
  );
};
