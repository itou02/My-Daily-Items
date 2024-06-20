import React, { useState, useEffect } from 'react';
import { FaPlus, FaChevronRight } from 'react-icons/fa';
import '../tailwind.css';
import AddItem from './addItem';
import EditItem from './editItem';

const category = [
    { name: '臉部保養品' },
    { name: '臉部化妝品' },
    { name: '眼部化妝品' },
    { name: '唇部化妝品' },
    { name: '身體保養品' },
    { name: '髮品' },
    { name: '消耗品' },
];

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_BASEURL}items`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);
    const onAddItemClick = () => setIsAddModalOpen(true);
    const onEditItemClick = (item) => {
        setCurrentItem(item);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const filteredItems = selectedCategory
        ? items.filter((item) => item.category === selectedCategory)
        : items;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">小物項目</h1>
                <button className="flex items-center bg-[#E59C85] px-4 py-2 rounded text-white" onClick={onAddItemClick}>
                    <FaPlus className="mr-2" /> 新增小物
                </button>
            </div>
            <div className="mb-4">
                <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">小物類別</option>
                    {category.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <ul className="divide-y divide-gray-300">
                {filteredItems.map(item => (
                    <li key={item.id} className="hover:bg-white flex justify-between items-center py-4 rounded-md px-4" onClick={() => onEditItemClick(item)}>
                        <div>
                            <p className="text-lg font-medium">{item.name}</p>
                            {
                                item.exp !== undefined
                                    ?
                                    <p className="text-sm text-gray-500">EXP: {item.exp.substring(0, 10)}</p>
                                    :
                                    <p className="text-sm text-gray-500">EXP: {item.exp}</p>
                            }
                        </div>
                        <div className="flex items-center">
                            {
                                (item.category == '臉部化妝品')
                                    ?
                                    <span className="bg-[#EFDD7C80] text-[#B18208] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                    :
                                    (item.category == '眼部化妝品')
                                        ?
                                        <span className="bg-[#B68DBD80] text-[#8C3A9A] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                        :
                                        (item.category == '唇部化妝品')
                                            ?
                                            <span className="bg-[#A7D7C980] text-[#3A8A73] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                            :
                                            (item.category == '臉部保養品')
                                                ?
                                                <span className="bg-[#DD808080] text-[#CB6060] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                                :
                                                (item.category == '身體保養品') ?
                                                    <span className="bg-[#C9BDB580] text-[#CB6060] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                                    :
                                                    (item.category == '髮品') ?
                                                        <span className="bg-[#76C5D780] text-[#458FA0] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                                        :
                                                        (item.category == '消耗品') ?
                                                            <span className="bg-[#EDBA8380] text-[#D27716] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                                                            :
                                                            <span className="bg-[#EDBA8380] text-[#D27716] px-2 py-1 rounded text-sm mr-4">{item.category}</span>
                            }
                            <FaChevronRight />
                        </div>
                    </li>
                ))}
            </ul>
            {isAddModalOpen && <AddItem onClose={handleCloseModal} />}
            {isEditModalOpen && currentItem && <EditItem item={currentItem} onClose={handleCloseModal} />}
        </div >
    );
};

export default ItemList;