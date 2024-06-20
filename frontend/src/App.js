import './tailwind.css';
import React, { useState, useEffect } from 'react';
import ItemList from './component/itemList';
import EditItem from './component/editItem';
import AddItem from './component/addItem';

const App = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleAddItemClick = () => setIsAddModalOpen(true);
  const handleEditItemClick = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <ItemList onAddItemClick={handleAddItemClick} onEditItemClick={handleEditItemClick} />
      </div>
      {isAddModalOpen && <AddItem onClose={handleCloseModal} />}
      {isEditModalOpen && currentItem && <EditItem item={currentItem} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
