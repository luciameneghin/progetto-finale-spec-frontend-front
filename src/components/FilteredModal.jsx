import React from 'react'

const FilteredModal = ({ isModalOpen, onClose, selectedCategory, setSelectedCategory }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div className="bg-white p-4 rounded w-80 shadow relative"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-2">Filtra per categoria</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="">Tutte</option>
          <option value="Conifera">Conifera</option>
          <option value="Latifoglia">Latifoglia</option>
          <option value="Monocotiledone">Monocotiledone</option>

        </select>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-800 hover:text-gray-500 text-xl font-bold">
          x
        </button>
        <button onClick={() => setSelectedCategory('')} className="bg-blue-500 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </div>
  );
};


export default FilteredModal
