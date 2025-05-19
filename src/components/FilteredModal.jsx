import React from 'react'

const FilteredModal = ({ isModalOpen, onClose, selectedCategory, setSelectedCategory }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#292929]/80 flex items-center justify-center z-50 font-[Quicksand]"
      onClick={onClose}
    >
      <div
        className="bg-[#568a99] text-white p-6 rounded-xl w-80 shadow-xl relative border-4 border-[#e9a716]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#e9a716]">Filtra per genere</h2>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border-none rounded-lg p-2 mb-4 text-[#292929] bg-white font-semibold"
        >
          <option value="">Tutti i generi</option>
          <option value="Rock">Rock</option>
          <option value="Funk / Soul">Funk / Soul</option>
          <option value="Disco">Disco</option>
          <option value="Soul">Soul</option>
          <option value="Jazz">Jazz</option>
          <option value="Prog">Prog</option>
          <option value="Blues">Blues</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={() => setSelectedCategory('')}
            className="bg-[#c7481d] text-white px-4 py-2 rounded-md hover:brightness-110 transition"
          >
            Reset
          </button>

          <button
            onClick={onClose}
            className="bg-white text-[#292929] px-4 py-2 rounded-md hover:bg-[#e9a716] hover:text-white transition"
          >
            Chiudi
          </button>
        </div>

        <span className="absolute top-2 right-3 text-white text-2xl font-bold cursor-pointer hover:scale-110" onClick={onClose}>
          ×
        </span>
      </div>
    </div>
  );
};

export default FilteredModal



