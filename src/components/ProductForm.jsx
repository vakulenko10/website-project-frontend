// ProductForm.js
import React, { useEffect } from 'react';
import { AuthData } from '../auth/AuthWrapper';

const ProductForm = ({
  isOverlayOpen,
  editingProductId,
  formData,
  setFormData,
  handleSubmit,
  toggleOverlay
}) => {
  const {token} = AuthData();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleImageChange = (e, index) => {
    const newImages = [...formData.images, e.target.value];
    setFormData(prevState => ({
      ...prevState,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, '']
    }));
  };

  const removeImageField = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      images: newImages
    }));
  };
  useEffect(() => {
    // Zablokowanie przewijania tła, gdy overlay jest otwarty
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden'; // Zablokowanie scrolla strony
    } else {
      document.body.style.overflow = 'auto'; // Przywrócenie scrolla strony
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOverlayOpen, token]);
  console.log("formData in product form:",formData)
  if (!isOverlayOpen) return null;

  return (
    <div className="overlay max-w-screen">
      <div className="overlay-content">
        <h2 className="text-text3 font-display text-2xl mb-4">
          {editingProductId ? 'Edit Product' : 'Create New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh]">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            placeholder="Material"
            className="w-full border border-color4 p-2 rounded"
          />
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="Color"
            className="w-full border border-color4 p-2 rounded"
          />
          {/* Image input fields */}
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name={`image-${index}`}
                value={image}
                onChange={(e) => handleImageChange(e, index)}
                placeholder={`Image URL ${index + 1}`}
                className="w-full border border-color4 p-2 rounded"
              />
              {/* Button to remove image field */}
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Button to add more image fields */}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-500 underline mt-2"
          >
            Add Another Image
          </button>
          <button
            type="submit"
            className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
          >
            {editingProductId ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={()=>{toggleOverlay(); setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] })}}
            className="bg-color8 text-text1 px-4 py-2 rounded hover:bg-color10 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
