import React from "react";

const TemplateSelector = ({ templates, onSelect }) => {
  return (
    <div className="template-selector">
      <h2>Select a Template</h2>
      <div className="template-grid">
        {templates.map((template, index) => (
          <div
            key={index}
            className="template-card"
            onClick={() => onSelect(template)}
          >
            <img
              src={template.thumbnail}
              alt={`Template ${index + 1}`}
              className="template-thumbnail"
            />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
