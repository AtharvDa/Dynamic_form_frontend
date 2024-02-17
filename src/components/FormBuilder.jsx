import React, { useState } from 'react';

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const addField = (type) => {
    setFields([...fields, { type, label: '',placeHolder:'', required:false, options: [] }]);
    console.log(fields);
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
  }

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
    newFields[index].options.push('');
    setFields(newFields);
  };

  const removeOption = (index, optionIndex) => {
    const newFields = [...fields];
    newFields[index].options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send formData to the backend here
  };

  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label>
              Label:
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
              />
            </label>
            <label>
              Placeholder:
            <input
                type="text"
                value={field.placeHolder}
                onChange={(e) => handlePlaceholderChange(index, e.target.value)}
              />
            </label>
            <label>
              Is it mandatory ?:
            <input
                type="checkbox"
                value={field.required}
                onChange={(e) => handleRequiredChange(index)}
              />
            </label>
            {field.type === 'dropdown' || field.type === 'multiselect' ? (
              <>
                Options:
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                    <button type="button" onClick={() => removeOption(index, optionIndex)}>
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
        <button type="button" onClick={() => addField('text')}>
          Add Text Field
        </button>
        <button type="button" onClick={() => addField('number')}>
          Add Number Field
        </button>
        <button type="button" onClick={() => addField('dropdown')}>
          Add Dropdown Field
        </button>
        {/* Add buttons for other field types */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBuilder;
