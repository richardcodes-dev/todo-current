import { useTasks } from "./useTasks";

export default function TodoList() {

  const {
    tasks, input, setInput, addTask, deleteTask, toggleComplete, cleanUp, updateTaskText,
    draggingEl, onDragStart, onDragOver, onDragEnd,
    editMode, setEditMode
  } = useTasks();

  return (

    <div className="max-w-full p-5 mx-auto mb-12 bg-white dark:bg-midnight-900 sm:p-8 rounded-2xl sm:rounded-3xl shadow-3xl dark:shadow-midnight-800/70">
      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-0 max-sm:text-3xl">Todo list</h1>

        <div className="flex justify-end px-3 gap-x-4 sm:gap-x-5">
          <button className="max-sm:text-sm text-body unstyled hover:text-primary-500 dark:text-white/50" title="Clean up completed tasks" onClick={() => cleanUp()}>
            <span className="sr-only">Clean Up</span>
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00375 22.6001L21.3438 22.6001C19.9037 18.8582 19.4111 16.7453 19.3438 13.0101L4.00375 13.0101C3.95073 16.8915 4.45229 18.989 6.00375 22.6001Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
              <path d="M9.75277 3.42025L9.75277 8.21025L6.40278 8.21025C5.76626 8.21025 5.15581 8.46311 4.70572 8.9132C4.25563 9.36328 4.00278 9.97373 4.00278 10.6103L4.00278 13.0103L19.3428 13.0103L19.3428 10.6103C19.3428 9.97373 19.0899 9.36329 18.6398 8.9132C18.1897 8.46311 17.5793 8.21025 16.9428 8.21025L13.5928 8.21025L13.5928 3.42025C13.5928 3.16557 13.5422 2.91343 13.4438 2.67851C13.3454 2.44358 13.2013 2.23058 13.0199 2.05189C12.8384 1.87321 12.6232 1.73241 12.3867 1.6377C12.1503 1.543 11.8974 1.49628 11.6428 1.50025C11.1388 1.50813 10.6581 1.71389 10.3045 2.07311C9.95088 2.43233 9.75271 2.91619 9.75277 3.42025Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
              <path d="M14.5527 16.8399C14.5527 18.54 15.7041 22.6001 17.7041 22.6001" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
          </button>
          <button className="text-xs sm:text-sm text-body unstyled hover:text-primary-500 dark:text-white/50" title="Edit all tasks" onClick={() => setEditMode(!editMode)}>
            <span className="">{editMode ? 'Save' : 'Edit'}</span>
          </button>

        </div>
      </div>


      <form onSubmit={(e) => { e.preventDefault(); addTask(); }} className="flex items-center w-full gap-2">
        <input
          type="text"
          value={input}
          className="flex-1 w-full p-3 border rounded-lg h-9 max-sm:text-sm sm:p-4 dark:text-white sm:rounded-xl sm:h-14 border-secondary-300 dark:border-secondary-700 dark:placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit" onClick={addTask} className="flex items-center justify-center h-8 p-0 text-white rounded-lg w-9 sm:text-3xl sm:rounded-xl sm:w-14 sm:h-14 btn btn-primary">
          <i>
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12H3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 21L12 3" stroke="currentColor" strokeWidth="1.8" />
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
            className={`pr-5 sm:pr-6 max-w-full max-sm:text-sm relative flex items-center justify-between px-2 py-1 transition-transform bg-white dark:bg-white/0 rounded-2xl ${editMode ? 'hover:cursor-grab' : ''} ${draggingEl === i ? 'opacity-50' : ''}`}
          >
            <i className={`sm:text-lg dark:text-secondary-500 absolute left-0 sm:left-2 transition-opacity block ${editMode ? 'opacity-30' : 'opacity-0'}`} title="Drag to reorder" aria-label='Drag to reorder'>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="5" r="2" fill="currentColor" />
                <circle cx="8" cy="12" r="2" fill="currentColor" />
                <circle cx="8" cy="19" r="2" fill="currentColor" />
                <circle cx="16" cy="5" r="2" fill="currentColor" />
                <circle cx="16" cy="12" r="2" fill="currentColor" />
                <circle cx="16" cy="19" r="2" fill="currentColor" />
              </svg>
            </i>

            <div className={`max-w-full flex items-center flex-1 transition-all gap-x-1 sm:gap-x-2 ${editMode ? 'pl-2 sm:pl-6' : 'pl-0'}`}>
              <div className="relative flex items-center justify-center w-6 h-6 transition-transform sm:w-8 sm:h-8 shrink-0">
                <input type="checkbox" id={`todo${task.id}`} className="sr-only peer" checked={task.completed} onChange={() => toggleComplete(task.id)} />
                <label htmlFor={`todo${task.id}`} className="w-full h-full border-3 border-[#B3DBF9] dark:border-secondary-700 rounded-full cursor-pointer peer-checked:bg-primary-500 peer-checked:border-primary-500 hover:border-primary-500">
                </label>
                <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" className="absolute inset-0 hidden m-auto text-white pointer-events-none peer-checked:block" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6L9.33333 19L3 12.5" stroke="currentColor" strokeWidth="3.83333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {editMode ? (
                <input
                  className={`min-w-0 max-w-full flex-1 rounded-lg py-1 px-2 border transition-all duration-300 block border-secondary-300 dark:border-secondary-700 bg-white dark:bg-white/0 dark:text-white/80 cursor-text focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent ${task.completed ? 'line-through opacity-50' : ''}`}
                  value={task.text}
                  onChange={(e) => updateTaskText(task.id, e.target.value)}
                />
              ) : (
                <span className={`dark:text-white/80 py-1 px-2 border border-white/0 ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</span>
              )}

            </div>

            <div className={`absolute right-0 flex ml-auto justify-end items-center transition-opacity ${editMode ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => deleteTask(task.id)}
                className={`text-sm sm:text-lg text-red-500 opacity-50 hover:text-primary-500 hover:opacity-100 dark:text-secondary-500`}
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
