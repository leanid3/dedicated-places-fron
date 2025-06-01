import React, { useState } from 'react';
import ErrorMessage from './errorMessage';

interface ParamsInputProps {
    params: Record<string, string>;
    onChange: (params: Record<string, string>) => void;
    error?: string;
}

const ParamsInput: React.FC<ParamsInputProps> = ({ params, onChange, error }) => {
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleAddParam = () => {
        if (newKey.trim() && newValue.trim()) {
            onChange({ ...params, [newKey]: newValue });
            setNewKey('');
            setNewValue('');
        }
    };

    const handleRemoveParam = (key: string) => {
        const newParams = { ...params };
        delete newParams[key];
        onChange(newParams);
    };

    const handleKeyChange = (oldKey: string, newKey: string) => {
        if (oldKey === newKey) return;
        
        const newParams = { ...params };
        const value = newParams[oldKey];
        delete newParams[oldKey];
        newParams[newKey] = value;
        onChange(newParams);
    };

    const handleValueChange = (key: string, value: string) => {
        onChange({ ...params, [key]: value });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="Ключ"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                />
                <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Значение"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                />
                <button
                    type="button"
                    onClick={handleAddParam}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Добавить
                </button>
            </div>

            {Object.entries(params).map(([key, value]) => (
                <div key={key} className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => handleKeyChange(key, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 flex-1"
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleValueChange(key, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveParam(key)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                        Удалить
                    </button>
                </div>
            ))}

            {error && <ErrorMessage type="error" message={error} />}
        </div>
    );
};

export default ParamsInput; 