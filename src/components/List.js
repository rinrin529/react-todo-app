import React, { useState } from 'react'; 
import '../App.css';

const List = React.memo((
    {id, title, completed, provided, snapshot, todoData, setTodoData}) => {
    //console.log('List component is renering');

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
 
    const hadleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            console.log(data.completed);
            return data;
        });
        setTodoData(newTodoData);
    };

    const handleClick = (id) => {
        // id랑 같지 않은 것들만 남기기
        let newTodoData = todoData.filter((data)=> data.id !== id);
        setTodoData(newTodoData);

        // 새로고침해도 입력했던 것들 그대로 있도록 localstorage에 저장
        // JSON.stringify를 사용해서 텍스트로 변환해준 다음에 저장
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.title = editedTitle;
            }
            return data;
        });
        setTodoData(newTodoData);
        setIsEditing(false);
    };

    if(isEditing) {
        return(
            <div 
            className={ "flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded bg-gray-100"}> 
                <div className="items-center">
                    <form onSubmit={handleSubmit}>
                        <input 
                            value={editedTitle}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                        />
                    </form>
                </div>
                <div className="items-center">
                    <button className="px-4 py-2 float-right" onClick={()=>setIsEditing(false)}> 
                            [ ✖ ]
                    </button>
                    <button className="px-4 py-2 float-right" type="submit" onClick={handleSubmit}> 
                            [ save ]
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            // provided에서 전해주는 정보를 div 요소에 준다
            <div 
            key={id} {...provided.draggableProps} 
            ref={provided.innerRef} {...provided.dragHandleProps}
            // 드래그 중이 경우 효과 주기
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
            > 
                <div className="items-center">
                    <input 
                        type="checkbox" 
                        defaultChecked={false} 
                        onChange={()=>hadleCompleteChange(id)} 
                    />{" "}
                    <span className={completed ? "line-through" : undefined} >
                        {title} 
                    </span>
                </div>
                <div className="items-center">
                    <button className="px-4 py-2 float-right"
                        onClick={()=>handleClick(id)}> 
                            [ ✖ ]
                    </button>
                    <button className="px-4 py-2 float-right"
                        onClick={()=>setIsEditing(true)}> 
                            [ edit ]
                    </button>
                </div>
            </div>
        )
    }


  
});

export default List