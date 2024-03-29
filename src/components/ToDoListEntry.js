import Checkmark from "../assets/icons/Checkmark.svg";
import Trashcan from "../assets/icons/Trashcan.svg";
import X from "../assets/icons/X.svg";

export default function ToDoListEntry(props) {
  return (
    // drop shadows remain even after element is gone on Safari
    // will-change-[filter] fixes that
    // https://stackoverflow.com/questions/56478925/safari-drop-shadow-filter-remains-visible-even-with-hidden-element
    <>
      {props.isComplete ? (
        <div className="flex flex-wrap flex-col w-[min(80%,600px)] h-[max(8rem, max-content)] bg-grey-pink text-grey p-4 mx-auto mb-8 rounded-2xl drop-shadow-normal break-words transition-all ease-in-out duration-250 will-change-[filter] ">
          <p className="mb-auto w-full">{props.taskDescription}</p>
          <div className="flex flex-wrap gap-2 justify-end">
            <X
              onClick={() => props.handleToggleComplete(props.id)}
              className="cursor-pointer"
            />
            <Trashcan
              onClick={() => props.handleDelete(props.id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap flex-col w-[min(80%,600px)] h-[max(8rem, max-content)] bg-pink text-dark-maroon p-4 mx-auto mb-8 rounded-2xl drop-shadow-normal break-words transition-all ease-in-out duration-250 will-change-[filter]">
          <p className="mb-auto w-full">{props.taskDescription}</p>
          <div className="flex flex-wrap gap-2 justify-end">
            <Checkmark
              onClick={() => props.handleToggleComplete(props.id)}
              className="cursor-pointer"
            />
            <Trashcan
              onClick={() => props.handleDelete(props.id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}
