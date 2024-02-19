import React, { useState } from "react";
import "./FormBuilder.css"

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [generatedField, setGeneratedField] = useState([]);

  const addField = (type) => {
    let newField;
    switch (type) {
      case "text":
      case "number":
        newField = { type, label: "", placeHolder: "", required: false, options: [] };
        break;
      case "dropdown":
      case "multiselect":
      case "singleselect":
        newField = { type, label: "", placeHolder: "", required: false, options: [""] };
        break;
      default:
        newField = { type, label: "", placeHolder: "", required: false, options: [] };
    }
    setFields([...fields, newField]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleLabelChange = (index, label) => {
    const newFields = [...fields];
    newFields[index].label = label;
    setFields(newFields);
  };

  const handlePlaceholderChange = (index, placeHolder) => {
    const newFields = [...fields];
    newFields[index].placeHolder = placeHolder;
    setFields(newFields);
  };

  const handleRequiredChange = (index) => {
    const newFields = [...fields];
    newFields[index].required = !newFields[index].required;
    setFields(newFields);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newFields = [...fields];
    newFields[index].options[optionIndex] = value;
    setFields(newFields);
  };

  const addOption = (index) => {
    const newFields = [...fields];
    newFields[index].options.push("");
    setFields(newFields);
  };

  const removeOption = (index, optionIndex) => {
    const newFields = [...fields];
    newFields[index].options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const addGeneratedField = () => {
    const newField = {
      type: fields[0].type,
      label: fields[0].label,
      placeHolder: fields[0].placeHolder,
      required: fields[0].required,
      options: fields[0].options
    };
    setGeneratedField([...generatedField, newField]);
    setFields([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(generatedField);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Dynamic Form Builder</h1>
      <div className="container">
        <div className="left">
          {generatedField.map((field, index) => (
            <div key={index}>
              {field.label && <label>{field.label}:</label>}
              {field.type === "text" && <input type="text" placeholder={field.placeHolder}/>}
              {field.type === "number" && <input type="number" placeholder={field.placeHolder}/>}
              {field.type === "dropdown" && (
                <select>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "multiselect" && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <span key={optionIndex}>
                      <input
                        type="checkbox"
                        id={`checkbox_${index}_${optionIndex}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            optionIndex,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`checkbox_${index}_${optionIndex}`}>
                        {option}
                      </label>
                    </span>
                  ))}
                </div>
              )}
              {field.type === "singleselect" && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        name={`radio_${index}`}
                        value={option}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              )}


            </div>
          ))}
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="right">
          <div className="all-btns">
            <div>
              <button type="button" onClick={() => addField("text")}>
                Text
              </button>
            </div>
            <div>
              <button type="button" onClick={() => addField("number")}>
                Number
              </button>
            </div>
            <div>
              <button type="button" onClick={() => addField("dropdown")}>
                Dropdown
              </button>
            </div>
            <div>
              <button type="button" onClick={() => addField("multiselect")}>
                Multiselect
              </button>
            </div>
            <div>
              <button type="button" onClick={() => addField("singleselect")}>
                Singleselect
              </button>
            </div>
          </div>
          <div className="btn-label">
            {fields.map((field, index) => (
              <div key={index}>
                <label>
                  Label:
                  <br/>
                  <input
                  className="input-style"
                    type="text"
                    value={field.label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                  />
                </label>
                <label>
                  Placeholder:
                  <br/>
                  <input
                    type="text"
                    className="input-style"
                    value={field.placeHolder}
                    onChange={(e) =>
                      handlePlaceholderChange(index, e.target.value)
                    }
                  />
                </label>
                <label>
                  Required:
                  
                  <input
                    type="checkbox"
                    className="input-style"
                    checked={field.required}
                    onChange={() => handleRequiredChange(index)}
                  />
                  <br />
                </label>
                {field.type === "dropdown" ||
                field.type === "multiselect" ||
                field.type === "singleselect" ? (
                  <>
                    Options:
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label htmlFor="">{optionIndex+1}</label>
                        <input
                          type="text"
                          className="input-style"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              optionIndex,
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, optionIndex)}
                        >
                          Remove Option
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addOption(index)}>
                      Add Option
                    </button>
                  </>
                ) : null}
                <button type="button" onClick={() => removeField(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addGeneratedField}>Add</button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
