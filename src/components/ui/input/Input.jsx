import { useImperativeHandle, useRef, useState } from "react";
import styles from "./Input.module.css";
import { Grid } from "../Grid";
import { Icon } from "./IconButton";
import { icons } from "./icons";
import Select from "react-select";

export const Checkbox = ({
  ref,
  id,
  className,
  name,
  checked = false,
  value,
  styleType = "checked",
  onChange = () => {},
  labelText,
}) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => inputRef.current);

  const clickHandler = () => {
    inputRef.current.checked = !inputRef.current.checked;
    onChange(inputRef.current);
  };

  return (
    <div className={styles.checkbox}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        type="checkbox"
        className={`${className}`}
        id={id}
        data-id={id}
        data-name={name}
        data-input-type="checkbox"
        ref={inputRef}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {styleType === "checked" && (
        <Icon
          onClick={clickHandler}
          iconSize={20}
          iconColor="#666"
          icon={inputRef.current?.checked ? icons.checked : icons.unchecked}
        />
      )}
      {styleType === "onoff" && (
        <div className={styles.checkboxOver} onClick={clickHandler}>
          <div className={styles.whiteCircle}></div>
        </div>
      )}
    </div>
  );
};

export const Radio = ({
  ref,
  id,
  className,
  name,
  checked = false,
  value,
  styleType = "checked",
  onChange = () => {},
  labelText,
}) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => inputRef.current);

  const clickHandler = () => {
    inputRef.current.checked = !inputRef.current.checked;
    onChange(inputRef.current);
  };

  return (
    <div className={styles.radio}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        type="radio"
        className={`${className}`}
        id={id}
        data-id={id}
        data-name={name}
        data-input-type="radio"
        ref={inputRef}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {styleType === "checked" && (
        <Icon
          onClick={clickHandler}
          iconSize={20}
          iconColor="#666"
          icon={
            inputRef.current?.checked
              ? icons.radioChecked
              : icons.radioUnChecked
          }
        />
      )}
      {styleType === "onoff" && (
        <div className={styles.checkboxOver} onClick={clickHandler}>
          <div className={styles.whiteCircle}></div>
        </div>
      )}
    </div>
  );
};
export const TextField = ({
  ref,
  matchRef,
  type = "text",
  id,
  className,
  name,
  placeholder,
  value,
  onChange = () => {},
  onMatch = () => {},
  labelText,
  style = {},
}) => {
  const matchHandler = () => {
    if (matchRef?.current) {
      onMatch(ref.current.value === matchRef.current.value);
    }
  };

  return (
    <span style={{ position: "relative" }}>
      <input
        type={type}
        className={`${className} ${styles.text}`}
        style={style}
        id={`${id}`}
        data-id={id}
        data-name={name}
        data-input-type="text"
        ref={ref}
        name={`${name}`}
        placeholder={placeholder}
        value={value}
        onInput={matchHandler}
        onChange={onChange}
      />
      {labelText && (
        <label className={styles.text} htmlFor={id}>
          {labelText}
        </label>
      )}
    </span>
  );
};

export const NativeSelect = ({
  ref,
  id,
  className,
  name,
  onChange = () => {},
  labelText,
  withDefault = false,
  defaultText = "선택하세요.",
  defaultValue = "",
  options = [],
}) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <select
        ref={ref}
        className={`${className} ${styles.select}`}
        id={id}
        data-id={id}
        data-name={name}
        data-input-type="select"
        onChange={onChange}
      >
        {withDefault && <option value={defaultValue}>{defaultText}</option>}
        {options.map(({ id, value, text, selected }) => (
          <option key={id} value={value} selected={selected}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
};

export const SelectBox = ({
  ref,
  id,
  name,
  onChange = () => {},
  labelText,
  options = [],
}) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <Select
        ref={ref}
        id={id}
        options={options}
        data-id={id}
        data-name={name}
        data-input-type="select"
        onChange={onChange}
      />
    </>
  );
};

const mediaType = {
  img: ["jpg", "jpeg", "png", "gif", "webp"],
  audio: ["mp3"],
  video: ["mp4"],
  other: [],
};

export const FileField = ({
  ref,
  id,
  className,
  name,
  preview = false,
  multiple = false,
  placeholder,
  value,
  onChange = () => {},
  labelText,
}) => {
  const [_2, setLoaded] = useState(false);
  const [_, setLoad] = useState(0);
  const [file, setFile] = useState([]);

  const changeHandler = () => {
    if (!preview) {
      return;
    }
    setLoaded(false);
    onChange();

    const files = ref.current.files;

    setFile(() => {
      const newState = [];
      Array.from(files).forEach((f) => {
        const fileObj = {};
        fileObj.id = `${Math.random()}_${f.size}`;
        fileObj.lastModifiedDate = f.lastModifiedDate;
        fileObj.name = f.name;
        fileObj.size = `${(f.size / 1024 / 1024).toFixed(2)}mb`;
        fileObj.ext = f.name
          .toLowerCase()
          .substring(f.name.lastIndexOf(".") + 1);
        fileObj.loaded = false;
        const reader = new FileReader();
        reader.onload = (e) => {
          setLoaded(true);
          setLoad(Math.random);
          fileObj.loaded = true;
          fileObj.data = e.target.result;
        };
        reader.readAsDataURL(f);
        newState.push(fileObj);
      });

      return newState;
    });
  };
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        type="file"
        hidden={preview}
        multiple={multiple}
        className={`${className} ${styles.file}`}
        id={id}
        data-id={id}
        data-name={name}
        data-input-type="file"
        ref={ref}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
      />
      <Button
        text="+"
        onClick={() => {
          ref.current.click();
        }}
      />
      {file.length > 0 && (
        <Grid
          style={{ display: "inline-grid" }}
          columnStyle="1fr 150px minmax(5rem, auto)"
          header={[
            { id: "col-1", title: "파일명" },
            { id: "col-2", title: "파일크기" },
            { id: "col-3", title: "미리보기" },
          ]}
          content={file.map((fc, index) => [
            { id: `row-${index}-${fc.id}`, value: fc.name },
            { id: `row-${index}-${fc.id}`, value: fc.size },
            {
              id: `row-${index}-${fc.id}`,
              value: mediaType.img.includes(fc.ext) ? (
                <img src={fc.data} style={{ maxWidth: "5rem" }} />
              ) : mediaType.audio.includes(fc.ext) ? (
                <audio src={fc.data} controls />
              ) : mediaType.video.includes(fc.ext) ? (
                <video src={fc.data} controls style={{ maxWidth: "10rem" }} />
              ) : (
                <div></div>
              ),
            },
          ])}
        />
      )}
    </>
  );
};

export const Textarea = ({
  ref,
  id,
  className,
  name,
  placeholder,
  value,
  onChange = () => {},
  labelText,
}) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <textarea
        ref={ref}
        className={`${className} ${styles.textarea}`}
        id={id}
        data-id={id}
        data-name={name}
        data-input-type="textarea"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
      ></textarea>
    </>
  );
};

export const Button = ({ text, className, onClick = () => {} }) => {
  const buttonStyles = {
    positive: {
      backgroundColor: "rgb(86 151 255)",
      color: "#FFF",
    },
    negative: {
      backgroundColor: "rgb(232 107 123)",
      color: "#FFF",
    },
  };

  return (
    <button
      type="button"
      className={styles.button}
      style={buttonStyles[className]}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
