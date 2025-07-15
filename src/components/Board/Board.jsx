import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import styles from './Board.module.css';
import Column from '../Column/Column';
import BoardHeader from './BoardHeader';

const LS_KEY = "kanban-columns-v1";

const initialBoard = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Design homepage', description: 'Create main layout and wireframe.', priority: 'High', daysLeft: 5 }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '2', title: 'Set up React project', description: 'Initialize repo and setup dependencies.', priority: 'Medium', daysLeft: 3 }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '3', title: 'Project kickoff', description: 'Define project scope and team roles.', priority: 'High', daysLeft: 0 }
    ]
  },
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      { id: '4', title: 'Project kickoff', description: 'Define project scope and team roles.', priority: 'High', daysLeft: 0 }
    ]
  }
];

const sorters = {
  priority: (a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  },
  due: (a, b) => a.daysLeft - b.daysLeft,
  az: (a, b) => a.title.localeCompare(b.title),
};

const Board = ({ filter, setFilter, sort, setSort }) => {
  // 1. Load from localStorage (or use initialBoard)
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : initialBoard;
  });

  // 2. Save columns to localStorage on any change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, newTask) => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, { ...newTask, id: Date.now().toString() }] }
          : col
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      )
    );
  };

  // Drag & Drop logic
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
    const destColIndex = columns.findIndex(col => col.id === destination.droppableId);

    const updatedColumns = [...columns];
    const [movedTask] = updatedColumns[sourceColIndex].tasks.splice(source.index, 1);
    updatedColumns[destColIndex].tasks.splice(destination.index, 0, movedTask);

    setColumns(updatedColumns);
  };

  return (
    <>
      <BoardHeader filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <DragDropContext onDragEnd={onDragEnd}>
        <main className={styles.board}>
          {columns.map((col) => {
            // FILTER & SORT tasks
            let filteredTasks = col.tasks;
            if (filter.trim()) {
              filteredTasks = filteredTasks.filter(
                task =>
                  task.title.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  task.description.toLowerCase().includes(filter.trim().toLowerCase())
              );
            }
            if (sort !== "default" && sorters[sort]) {
              filteredTasks = filteredTasks.slice().sort(sorters[sort]);
            }
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      transition: 'background 0.22s',
                      background: snapshot.isDraggingOver ? '#e3f2fd' : 'transparent',
                      borderRadius: '12px',
                      minHeight: '100px'
                    }}
                  >
                    <Column
                      columnId={col.id}
                      title={col.title}
                      tasks={filteredTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </main>
      </DragDropContext>
    </>
  );
};

export default Board;
