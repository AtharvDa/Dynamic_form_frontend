import React from "react";

const Field = ({ type, label, options, onLabelChange, onOptionChange, onAddOption, onRemoveOption }) => {
    switch (type) {
      case 'text':
        return (
          <div>
            <label>{label}</label>
            <input type="text" />
          </div>
        );
      case 'number':
        return (
          <div>
            <label>{label}</label>
            <input type="number" />
          </div>
        );
      case 'dropdown':
        return (
          <div>
            <label>{label}</label>
            <select>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <button onClick={onAddOption}>Add Option</button>
          </div>
        );
      case 'multiselect':
        return (
          <div>
            <label>{label}</label>
            <select multiple>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <button onClick={onAddOption}>Add Option</button>
          </div>
        );
      // Add cases for other field types
      default:
        return null;
    }
  };
  
  export default Field;
  