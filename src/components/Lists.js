import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../App.css';
import List from './List';

const Lists = React.memo(({todoData, setTodoData}) => {
    //console.log('Lists component is renering');

    const handleEnd = (result) => {  
        // result에는 드래그 하고자하는 위치 befo after가 나온다 
        console.log(result);

        // 드래그해서 위치를 바꾸지 않았다면 그냥 종료 처리
        if(!result.destination) return;
        
        // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
        const newTodoData = todoData;

        // 1. 변경시키려는 항목을 배열에서 삭제 
        // 2. return 값으로 지워진 항목을 가져온다
        // splice 매소드 - splice(index, 1) : index 위치에서 1개 삭제
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderedItem을 추가
        // splice 매소드 - splice(index, 0, item) : index 위치에 0개를 삭제하고 item을 추가
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
    };

  return (
    <div>
        {/* drop 했을 때 (Drag가 end 되었을 때) 위치 변경 처리하는 handleEnd 함수 */}
        <DragDropContext onDragEnd={handleEnd}>
            <Droppable droppableId='todo-content'>
                {/* Droppable : provided 파라미터 전달 */}
                {(provided) => (
                    // provided에서 전해주는 정보를 div 요소에 준다
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.map((data, index) => (
                        // map 속성 있으니까 Draggable에 key 추가
                        <Draggable
                            key={data.id}
                            draggableId={data.id.toString()}
                            index={index}
                        >
                        {/* Draggable : provided & snapshot 파라미터 전달 */}
                        {(provided, snapshot) => (
                            <List 
                            key={data.id}
                            id={data.id}
                            title={data.title}
                            provided={provided}
                            snapshot={snapshot}
                            completed={data.completed}
                            todoData={todoData} 
                            setTodoData={setTodoData}/>
                        )}
                        </Draggable>
                        ))}
                    {provided.placeholder}
                </div>
            )}
            </Droppable>
        </DragDropContext>
    </div>
  )
});

export default Lists

