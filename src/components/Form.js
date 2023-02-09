import React from 'react';
import '../App.css';

export default function Form({value, setValue, handleSubmit}) {
    //console.log('Form component is renering');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex pt-2">
            <input 
                className="w-full px-3 py-2 mr-4 text-gray-500 border rounded"
                type="text" 
                name="value" 
                placeholder="해야할 일을 입력하세요" 
                value={value}
                onChange={handleChange}
            />
            <input
                className="p-2 text-blue-400 border-2 rounded hover:text-white hover:bg-blue-200"
                type="submit"
                value="입력"
                style={{flex: "1"}}
            />
            </form>
        </div>
    )
}
