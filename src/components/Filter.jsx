import React, { useState } from 'react';
import Container from './Container';

const Filter = ({ items, setFilteredItems, itemsName }) => {
  // Extract attributes from the first item dynamically, excluding `id`
  const attributes = items && items.length > 0 ? Object.keys(items[0]) : [];
  const [filters, setFilters] = useState(
    attributes.map((attr) => ({ attribute: attr, min: '', max: '', value: '' }))
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle filter form

  const handleFilter = () => {
    const filtered = items.filter((item) => {
      return filters.every(({ attribute, min, max, value }) => {
        const itemValue = item[attribute];

        // Apply numeric filters
        if (typeof itemValue === 'number') {
          const isAboveMin = min ? itemValue >= Number(min) : true;
          const isBelowMax = max ? itemValue <= Number(max) : true;
          return isAboveMin && isBelowMax;
        }

        // Apply text/other filters
        if (typeof itemValue === 'string' || typeof itemValue === 'boolean') {
          return value ? String(itemValue).includes(value) : true;
        }

        return true; // Skip unsupported types
      });
    });

    setFilteredItems(filtered);
    handleFilterOpen(); // Close the filter form after applying
  };

  const updateFilter = (index, key, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index][key] = value;
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
        value: '',
      }))
    );
    setFilteredItems(items); // Reset filtered items to all items
  };
  
  return (
    <div className="relative">
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
      <Container classes={'max-w-[500px]'}>
      <div className="mt-4">
        <h4 className="text-text3 font-serif font-medium mb-2">
          Applied Filters:
        </h4>
        <div className="flex flex-wrap gap-2">
          {filters
            .filter(
              (filter) =>
                (filter.min || filter.max || filter.value) && filter.attribute
            )
            .map((filter) => (
              <div
                key={filter.attribute}
                className="bg-text1 text-text3 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {filter.attribute}:{' '}
                {filter.min && `Min ${filter.min} `}
                {filter.max && `Max ${filter.max} `}
                {filter.value && `Value "${filter.value}"`}
              </div>
            ))}
          {!filters.some(
            (filter) =>
              filter.min || filter.max || filter.value || filter.attribute
          ) && (
            <span className="text-gray-500 text-sm italic">
              No filters applied.
            </span>
          )}
        </div>
      </div>
    </Container>
      

      {/* Filter Form */}
      {isFilterOpen && (
        <div className="fixed inset-0 box-border h-screen p-5 bg-color3 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full max-w-3xl p-6 rounded-lg shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4 text-text3 font-serif">
              Filter {itemsName}
            </h3>

            <div className="relative">
              {filters.map((filter, index) => {
                const isNumeric = typeof items[0][filter.attribute] === 'number';
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
