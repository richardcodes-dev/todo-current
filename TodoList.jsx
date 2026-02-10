import { useTasks } from "./useTasks";

export default function TodoList() {

  const {
    tasks, input, setInput, addTask, deleteTask, toggleComplete, cleanUp, updateTaskText,
    onDragStart, onDragOver, onDragEnd,
    editMode, setEditMode
  } = useTasks();

  return (

    <div class="max-w-full p-6 mx-auto mb-12 bg-white sm:p-8 rounded-3xl shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-0">Todo list</h1>

        <div className="flex justify-end px-3 gap-x-5">
          <button className="text-sm text-body unstyled hover:text-primary-500" title="Clean up completed tasks" onClick={() => cleanUp()}>
            <span className="sr-only">Clean Up</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00375 22.6001L21.3438 22.6001C19.9037 18.8582 19.4111 16.7453 19.3438 13.0101L4.00375 13.0101C3.95073 16.8915 4.45229 18.989 6.00375 22.6001Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
              <path d="M9.75277 3.42025L9.75277 8.21025L6.40278 8.21025C5.76626 8.21025 5.15581 8.46311 4.70572 8.9132C4.25563 9.36328 4.00278 9.97373 4.00278 10.6103L4.00278 13.0103L19.3428 13.0103L19.3428 10.6103C19.3428 9.97373 19.0899 9.36329 18.6398 8.9132C18.1897 8.46311 17.5793 8.21025 16.9428 8.21025L13.5928 8.21025L13.5928 3.42025C13.5928 3.16557 13.5422 2.91343 13.4438 2.67851C13.3454 2.44358 13.2013 2.23058 13.0199 2.05189C12.8384 1.87321 12.6232 1.73241 12.3867 1.6377C12.1503 1.543 11.8974 1.49628 11.6428 1.50025C11.1388 1.50813 10.6581 1.71389 10.3045 2.07311C9.95088 2.43233 9.75271 2.91619 9.75277 3.42025Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
              <path d="M14.5527 16.8399C14.5527 18.54 15.7041 22.6001 17.7041 22.6001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
            </svg>
          </button>
          <button className="text-sm text-body unstyled hover:text-primary-500" title="Edit all tasks" onClick={() => setEditMode(!editMode)}>
            <span className="">{editMode ? 'Save' : 'Edit'}</span>
          </button>

        </div>
      </div>


      <form onSubmit={(e) => { e.preventDefault(); addTask(); }} className="flex items-center w-full gap-2">
        <input
          type="text"
          value={input}
          className="flex-1 w-full p-4 mr-2 border rounded-xl h-14 border-secondary-300"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit" onClick={addTask} className="flex items-center justify-center p-0 text-3xl text-white rounded-xl w-14 h-14 btn btn-primary">
          <i>
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12H3" stroke="currentColor" stroke-width="1.8" />
              <path d="M12 21L12 3" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </i>
          <span className="sr-only">Add Task</span>
        </button>
      </form>
      <ul className="mt-6 unstyled">
        {tasks.map((task, i) => (
          <li
            key={task.id}
            draggable={editMode}
            onDragStart={(e) => onDragStart(e, i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDragEnd={onDragEnd}
            className={`relative flex items-center px-2 py-1 transition-transform bg-white rounded-2xl gap-x-2 ${editMode ? 'hover:cursor-grab' : ''}`}
          >
            <i className={`absolute left-2 transition-opacity block ${editMode ? 'opacity-30' : 'opacity-0'}`} title="Drag to reorder" aria-label='Drag to reorder'>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="5" r="2" fill="black" />
                <circle cx="8" cy="12" r="2" fill="black" />
                <circle cx="8" cy="19" r="2" fill="black" />
                <circle cx="16" cy="5" r="2" fill="black" />
                <circle cx="16" cy="12" r="2" fill="black" />
                <circle cx="16" cy="19" r="2" fill="black" />
              </svg>
            </i>

            <div className={`flex items-center flex-1 transition-all gap-x-2 ${editMode ? 'pl-6' : 'pl-0'}`}>
              <div className="relative flex items-center justify-center w-8 h-8 transition-transform">
                <input type="checkbox" id={`todo${task.id}`} className="sr-only peer" checked={task.completed} onChange={() => toggleComplete(task.id)} />
                <label htmlFor={`todo${task.id}`} className="w-full h-full border-3 border-[#B3DBF9] rounded-full cursor-pointer peer-checked:bg-primary-500 peer-checked:border-primary-500 hover:border-primary-500">
                </label>
                <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" className="absolute inset-0 hidden m-auto text-white pointer-events-none peer-checked:block" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6L9.33333 19L3 12.5" stroke="currentColor" stroke-width="3.83333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              {editMode ? (
                <input
                  className={`flex-1 rounded-lg py-1 px-2 border transition-all duration-300 block border-secondary-300 bg-white cursor-text ${task.completed ? 'line-through opacity-50' : ''}`}
                  value={task.text}
                  onChange={(e) => updateTaskText(task.id, e.target.value)}
                />
              ) : (
                <span className={`py-1 px-2 border border-white ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</span>
              )}

            </div>

            <div className={`flex justify-end items-center gap-3 transition-all ${editMode ? 'w-6 opacity-100' : 'w-0 opacity-0'}`}>
              <button
                onClick={() => deleteTask(task.id)}
                className={`text-lg text-red-500 opacity-50 hover:text-primary-500 hover:opacity-100`}
              >
                <span className="sr-only">Delete todo</span>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}
