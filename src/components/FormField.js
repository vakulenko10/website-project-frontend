import React from 'react';

function FormField({ label, type, value, options, onChange, unit, classes = '', children }) {
  return (
    <div className={`form-field ${classes}`}>
      {label ?<label>{label}</label>:<></>}
      {children ? (
         <>{children}</> 
      ) : (
        // Default rendering if no children passed
        type === 'button' ? (
          <div className="button-group">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={value === option ? 'active' : ''}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="input-group">
            <input 
              type={type} 
              value={value} 
              onChange={(e) => onChange(e.target.value)} 
            />
            {unit && <span>{unit}</span>}
          </div>
        )
      )}
    </div>
  );
}

export default FormField;
