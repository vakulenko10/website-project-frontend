import React, { useDebugValue, useEffect, useState } from 'react';
import FormField from './FormField';

function Form() {
  const [formData, setFormData] = useState({
    sex: 'Male',
    age: 21,
    height: 170,
    weight: 60,
    activityLevel: 'Moderately'
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(JSON.stringify(formData))
  };
  const handleFormSubmit = (e) =>{
    e.preventDefault();
    console.log(e)
  }
  // useEffect(()=>{
  //   console.log(formData)
  // }, [formData])
  return (
    <form className="form">
      <FormField 
        label="What is your sex?" 
        type="button" 
        options={['Male', 'Female']} 
        value={formData.sex} 
        onChange={(value) => handleInputChange('sex', value)} 
      />
      <FormField 
        label="How old are you?" 
        type="number" 
        value={formData.age} 
        onChange={(value) => handleInputChange('age', value)} 
      />
      <FormField 
        label="How tall are you?" 
        type="number" 
        unit="cm"
        value={formData.height} 
        onChange={(value) => handleInputChange('height', value)} 
      />
      <FormField 
        label="How much do you weigh?" 
        type="number" 
        unit="kg"
        value={formData.weight} 
        onChange={(value) => handleInputChange('weight', value)} 
      />
      <FormField 
        label="How active are you on a daily basis?" 
        type="button" 
        options={['Moderately', 'Lightly', 'Active', 'Very Active']} 
        value={formData.activityLevel} 
        onChange={(value) => handleInputChange('activityLevel', value)} 
        classes={'wide-field'}
      />
      <FormField classes='button-container'> 
        <button className='calculate-button' type='submit' onClick={handleFormSubmit}>
          Calculate
        </button>
      </FormField>
      
    </form>
  );
}

export default Form;
