function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  // Iterate over the object properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // If the property is an array, loop through its elements
      if (Array.isArray(obj[key])) {
        obj[key].forEach((value: any) => {
          formData.append(key, value);
        });
      } else {
        // Otherwise, append the key-value pair to FormData
        formData.append(key, obj[key]);
      }
    }
  }

  return formData;
}

export default objectToFormData;