import { useState, useMemo, useEffect, useRef } from "react";
import ToDoListEntry from "./ToDoListEntry";
import { useSession } from "next-auth/react";

export default function ToDoList() {
  const [formInput, setFormInput] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [menuState, setMenuState] = useState("all");
  const { status } = useSession();
  const isDataRetrieved = useRef(false); // stops a race condition with POST request

  const LOCAL_STORAGE_KEY = "productifyLocalStorageKey";

  // load stored data from local storage or database
  useEffect(() => {
    const getInitialToDoList = async () => {
      if (status === "loading") return;

      let savedToDoList = [];

      if (status === "authenticated") {
        const response = await fetch("/api/entries");
        const body = await response.json();
        savedToDoList = body.savedToDoList;
      }

      if (status === "unauthenticated") {
        savedToDoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      }

      if (savedToDoList?.length > 0) setToDoList(savedToDoList);

      isDataRetrieved.current = true;
    };

    getInitialToDoList();
  }, [status]);

  // store to-do list to local storage or database
  useEffect(() => {
    const storeToDoList = async () => {
      if (status === "loading") return;

      if (!isDataRetrieved.current) return;

      if (status === "authenticated") {
        const response = await fetch("/api/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toDoList }),
        });
      }

      if (status === "unauthenticated") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList));
      }
    };

    storeToDoList();
  }, [toDoList, status, isDataRetrieved]);

  // input field functionality
  const handleChange = (event) => {
    setFormInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formInput) return;

    setToDoList((previous) => [
      ...previous,
      { taskDescription: formInput, id: Date.now(), isComplete: false },
    ]);

    setFormInput("");
  };

  // todo entry functionality
  const handleToggleComplete = (id) => {
    const newToDoList = [...toDoList];
    const entry = newToDoList.find((entry) => entry.id === id);
    entry.isComplete = !entry.isComplete;
    setToDoList(newToDoList);
  };

  const handleDelete = (id) => {
    setToDoList(toDoList.filter((entry) => entry.id !== id));
  };

  // make slider move
  const generateMenuSliderCSS = () => {
    switch (menuState) {
      case "all":
        return "left-0 rounded-l-2xl";

      case "complete":
        return "left-1/3";

      case "incomplete":
        return "left-2/3 rounded-r-2xl";

      default:
        return "";
    }
  };

  // stops calls from happening on text input
  // explanation: https://www.youtube.com/watch?v=tz0fDABt67g
  const menuSliderCSS = useMemo(() => generateMenuSliderCSS(), [menuState]);

  // show tasks depending on menu option selected
  const generateViewableTasks = (menuState) => {
    if (status === "loading")
      return <div className="m-auto text-dark-maroon">Loading...</div>;

    const renderTaskList = (taskList) => {
      return taskList.map((entry) => (
        <ToDoListEntry
          taskDescription={entry.taskDescription}
          isComplete={entry.isComplete}
          handleToggleComplete={handleToggleComplete}
          handleDelete={handleDelete}
          id={entry.id}
          key={entry.id}
        />
      ));
    };

    switch (menuState) {
      case "all":
        return renderTaskList(toDoList);

      case "complete":
        const completeTodosList = toDoList.filter((entry) => entry.isComplete);
        return renderTaskList(completeTodosList);

      case "incomplete":
        const incompleteTodosList = toDoList.filter((entry) => !entry.isComplete);
        return renderTaskList(incompleteTodosList);

      default:
        return renderTaskList(toDoList);
    }
  };

  // see explanation of useMemo above
  const viewableTasks = useMemo(
    () => generateViewableTasks(menuState),
    [toDoList, menuState, status]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          value={formInput}
          onChange={handleChange}
          placeholder="I need to..."
          className="w-[min(80%,600px)] h-16 bg-pink text-dark-maroon placeholder-dark-maroon px-4 mb-8 rounded-2xl drop-shadow-normal focus:outline-none"
        />
      </form>

      <div className="relative w-[min(80%,600px)] h-[max(4rem, max-content)] bg-pink text-dark-maroon text-sm mx-auto mb-8 rounded-2xl drop-shadow-normal flex justify-between items-center ">
        {/* menu; z-10 makes slider not hide text*/}
        <button
          onClick={() => setMenuState("all")}
          className={"w-full rounded-l-2xl select-none z-10"}>
          All Tasks
        </button>
        <button
          onClick={() => setMenuState("complete")}
          className={"w-full select-none z-10"}>
          Complete
        </button>
        <button
          onClick={() => setMenuState("incomplete")}
          className={"w-full rounded-r-2xl select-none z-10"}>
          Incomplete
        </button>

        {/* slider; inspired by https://www.youtube.com/watch?v=QtwXQdlvyWA */}
        <div
          className={
            "absolute left-0 top-0 w-1/3 h-full bg-grey-pink transition-all ease-in-out duration-250 " +
            menuSliderCSS
          }
        />
      </div>

      {viewableTasks}
    </>
  );
}
