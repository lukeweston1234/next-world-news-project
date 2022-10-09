import React from "react";

type SidebarProps = {
  canShow: boolean;
  setCanShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar(props: SidebarProps) {
  return (
    <div
      className={`z-40 absolute w-2/6 rounded-lg m-5 h-5/6 opacity-80 right-0 bg-gray-800
    text-white ${props.canShow ? "inline" : "hidden"}`}
    >
      <button
        onClick={() => {
          props.setCanShow(false);
        }}
      >
        Close
      </button>
    </div>
  );
}
