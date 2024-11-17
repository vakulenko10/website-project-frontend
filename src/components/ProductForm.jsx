import React, { useState } from 'react';

const ProductForm = ({
  isOverlayOpen,
  editingProductId,
  initialFormData,
  handleSubmit,
  toggleOverlay,
}) => {
  const [formData, setFormData] = useState(
    initialFormData || {
      name: '',
      description: '',
      price: '',
      material: '',
      color: '',
      images: [''],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: [value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (!isOverlayOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2 className="text-text3 font-display text-2xl mb-4">
          {editingProductId ? 'Edit Product' : 'Create New Product'}
        </h2>
        <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-4 overflow-y-auto max-h-[70vh]">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-color4 p-2 rounded"
            required
          />
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="Material"
            className="w-full border border-color4 p-2 rounded"
          />
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
            className="w-full border border-color4 p-2 rounded"
          />
          <input
            type="text"
            name="images"
            value={formData.images[0] || ''}
            onChange={(e) => handleChange({ target: { name: 'images', value: e.target.value } })}
            placeholder="Image URL"
            className="w-full border border-color4 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
          >
            {editingProductId ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={toggleOverlay}
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
