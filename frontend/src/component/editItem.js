import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import '../tailwind.css';

const categorys = [
    { name: '臉部保養品' },
    { name: '臉部化妝品' },
    { name: '眼部化妝品' },
    { name: '唇部化妝品' },
    { name: '身體保養品' },
    { name: '髮品' },
    { name: '消耗品' },
];

const EditItem = ({ item, onClose }) => {
    const [name, setName] = useState(item.name);
    const [exp, setExpiry] = useState(item.exp);
    const [category, setCategory] = useState(item.category);
    const [note, setNote] = useState(item.note || '');

    const handleSubmit = () => {
        const updatedItem = { name, category, exp, note };
        console.log(item);
        fetch(`${process.env.REACT_APP_BACKEND_BASEURL}items/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                onClose();
            })
            .catch(error => console.error('Error123:', error));
        console.log('123');

    };
    
    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_BACKEND_BASEURL}items/${item.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted:', data);
                onClose();
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <div className="text-center mb-4">
                    <div className="text-4xl text-gray-400 mb-2">📝</div>
                    <h2 className="text-xl font-semibold">修改小物</h2>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="小物名稱"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="效期/EXP 格式：YYYY-MM-DD"
                            value={exp}
                            onChange={e => setExpiry(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            📅
                        </div>
                    </div>
                    <select
                        className="w-full border border-gray-300 rounded p-2"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {categorys.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="輸入備註以免忘記 :D! e.g. 在哪購入？價格為？存放在哪裡..."
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-between mt-4 gap-2">
                    <button className="bg-gray-200 px-4 py-2 rounded w-full" onClick={onClose}>取消</button>
                    <button className="bg-[#E59C85] text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>確定</button>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="text-red-500" onClick={handleDelete}>
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditItem;