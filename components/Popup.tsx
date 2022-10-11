import React, { useState } from "react";

type Post = {
  id: number;
  title: string;
  url: string;
  score: number;
  time: string;
};

type PopupProps = {
  deleteFunction: () => void;
  posts: Array<Post>;
};

export default function Popup(props: PopupProps) {
  console.log(props);
  const [index, setIndex] = useState(0);

  const nextHandler = () => {
    if (index + 1 < props.posts.length) {
      setIndex((index) => index + 1);
    }
  };

  const backHandler = () => {
    if (index - 1 >= 0) {
      setIndex((index) => index - 1);
    }
  };

  const redirectHandle = () => {
    document.location.href = props.posts[index].url;
  };

  return (
    <div className="flex p-3 bg-opacity-100 flex-col z-50 m-0 w-52 h-56 rounded-lg justify-between bg-gradient-to-b from-white to-colors-navbar-purple">
      <h2
        onClick={redirectHandle}
        className="font-bold text-colors-header-purple text-sm  font-sans  overflow-y-auto cursor-pointer"
      >
        {props.posts[index].title}
      </h2>

      <div className="flex flex-row justify-around font-bold text-sm font-sans h-7 ">
        {index + 1 < props.posts.length && (
          <button
            className="rounded-lg p-1 text-white active:translate-y-0.5 bg-gradient-to-b from-gray-300 to-colors-gradient-purple"
            onClick={nextHandler}
          >
            Next
          </button>
        )}
        {index - 1 >= 0 && (
          <button
            className="rounded-lg p-1 text-white  active:-translate-y-0.5 bg-gradient-to-b from-gray-300 to-colors-gradient-purple"
            onClick={backHandler}
          >
            Back
          </button>
        )}
        <button
          className="rounded-lg p-1 text-white  active:translate-y-0.5 bg-gradient-to-b from-gray-300 to-colors-gradient-purple"
          onClick={props.deleteFunction}
        >
          Close
        </button>
      </div>
    </div>
  );
}
