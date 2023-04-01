import { useState } from 'react';

const useCustomForm = <T>(initialValues: T, onSubmit: (data: T) => void) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === 'isStudent') {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    reset,
  };
};

export default useCustomForm;
