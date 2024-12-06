import React, { useEffect, useState } from 'react';
import Container from './Container';

const Filter = ({ items, setFilteredItems, itemsName, classes = '' }) => {
  // Define attributes with hardcoded options
  const valuesWithOptions = {
    color: [],
    material: [],
    status: [],
    products: [],
    user_id: []

  };

  // Attributes to exclude from filtering
  const excludedAttributes = ['id', 'description', 'images', "name", "products", "user_id", "created_at", "address"];

  // Extract attributes and generate dynamic options
  const attributes =
    items && items.length > 0
      ? Object.keys(items[0]).filter((attr) => !excludedAttributes.includes(attr))
      : [];
  attributes.forEach((attr) => {
    if (valuesWithOptions[attr] !== undefined) {
      const uniqueValues = Array.from(
        new Set(
          items
            .flatMap((item) => item[attr]?.split(/[\s,]+/) || []) // Split by space or comma
            .map((value) => value.trim())
        )
      );
      valuesWithOptions[attr] = uniqueValues;
    }
  });

  const [filters, setFilters] = useState(
    attributes.map((attr) => ({
      attribute: attr,
      min: '',
      max: '',
      values: [], // To support multiple selected options
    }))
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilter = () => {
    const filtered = items.filter((item) =>
      filters.every(({ attribute, min, max, values }) => {
        const itemValue = item[attribute];

        if (typeof itemValue === 'number') {
          const isAboveMin = min ? itemValue >= Number(min) : true;
          const isBelowMax = max ? itemValue <= Number(max) : true;
          return isAboveMin && isBelowMax;
        }

        if (values.length > 0) {
          const itemValues = itemValue?.split(/[\s,]+/) || [];
          return values.some((value) => itemValues.includes(value));
        }

        return true;
      })
    );

    setFilteredItems(filtered);
    handleFilterOpen(); // Close the filter form
  };

  const updateFilter = (index, key, value) => {
    const updatedFilters = [...filters];
    if (key === 'values') {
      const values = updatedFilters[index][key];
      if (values.includes(value)) {
        updatedFilters[index][key] = values.filter((v) => v !== value); // Remove value if already selected
      } else {
        updatedFilters[index][key] = [...values, value]; // Add value if not selected
      }
    } else {
      updatedFilters[index][key] = value;
    }
    setFilters(updatedFilters);
  };

  const handleFilterOpen = () => {
    setIsFilterOpen((prevState) => {
      const isOpen = !prevState;

      if (isOpen) {
        document.body.classList.add('cart-no-scroll');
      } else {
        document.body.classList.remove('cart-no-scroll');
      }

      return isOpen;
    });
  };

  const clearFilters = () => {
    setFilters(
      attributes.map((attr) => ({
        attribute: attr,
        min: '',
        max: '',
        values: [],
      }))
    );
    setFilteredItems(items);
  };
  useEffect(()=>{
    console.log(items)
  }, [])
  return (
    <div className={`FilterComponent relative ${classes}`}>
      {/* Toggle Button */}
      <button
        onClick={handleFilterOpen}
        className="bg-text5 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-text6 transition"
      >
        {isFilterOpen ? 'Close Filters' : 'Open Filters'}
      </button>
      {/* Clear All Filters Button */}
      <button
        onClick={clearFilters}
        className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
      >
        Clear All Filters
      </button>

      {/* Display Applied Filters */}
      <Container classes={'max-w-[500px] md:mt-3 rounded-lg p-1 bg-text2 '}>
        {filters&&<div className="mt-4">
          <h4 className="text-text3 font-serif font-medium mb-2">
            Applied Filters:
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters
              .filter(
                (filter) =>
                  (filter.min || filter.max || filter.values.length > 0) &&
                  filter.attribute
              )
              .map((filter) => (
                <div
                  key={filter.attribute}
                  className="bg-text1 text-text3 px-3 py-1 rounded-full text-sm shadow-sm"
                >
                  {filter.attribute}:{' '}
                  {filter.min && `Min ${filter.min}$ `}
                  {filter.max && `Max ${filter.max}$ `}
                  {filter.values.length > 0 &&
                    `Values "${filter.values.join(', ')}"`}
                </div>
              ))}
            {!filters.some(
              (filter) =>
                filter.min || filter.max || filter.values.length > 0
            ) && (
              <span className="text-gray-500 text-sm italic">
                No filters applied.
              </span>
            )}
          </div>
        </div>}
      </Container>

      {/* Filter Form */}
      {isFilterOpen && (
        <div className="fixed inset-0 box-border h-screen p-5 bg-color3 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full max-w-3xl p-6 rounded-lg shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4 text-text3 font-serif">
              Filter {itemsName}
            </h3>

            <div
              className="relative overflow-y-auto custom-scrollbar max-h-[70vh] pr-4"
              style={{ paddingBottom: '60px' }} // Account for button height
            >
              {filters.map((filter, index) => {
                const isNumeric = typeof items[0][filter.attribute] === 'number';
                const isWithOptions = valuesWithOptions[filter.attribute];
                return (
                  <div
                    key={filter.attribute}
                    className="flex flex-row my-2 items-center gap-2 relative box-border"
                  >
                    <label className="font-medium text-text3 font-serif capitalize">
                      {filter.attribute}:
                    </label>
                    {isNumeric ? (
                      <div className="flex flex-row gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filter.min}
                          onChange={(e) =>
                            updateFilter(index, 'min', e.target.value)
                          }
                          className="border border-text3 p-2 rounded-lg max-w-[50px]"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filter.max}
                          onChange={(e) =>
                            updateFilter(index, 'max', e.target.value)
                          }
                          className="border border-text3 p-2 rounded-lg max-w-[50px]"
                        />
                      </div>
                    ) : isWithOptions ? (
                      <div className="flex flex-wrap gap-2">
                        {valuesWithOptions[filter.attribute].map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              updateFilter(index, 'values', option)
                            }
                            className={`py-1 px-2 rounded ${
                              filter.values.includes(option)
                                ? 'bg-text5 text-white'
                                : 'bg-gray-200 text-gray-800'
                            } hover:bg-text6 transition`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Value"
                        value={filter.value}
                        onChange={(e) =>
                          updateFilter(index, 'value', e.target.value)
                        }
                        className="border border-text3 p-2 rounded-lg w-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="absolute z-10 bottom-0 p-6 left-0 bg-text1 w-full flex justify-between">
              <button
                onClick={handleFilterOpen}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleFilter}
                className="bg-text5 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-text6 transition"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
