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
    <div className="shadow-md flex p-3 bg-opacity-100 flex-col z-50 m-0 w-52 h-56 rounded-lg justify-between bg-gradient-to-b from-white to-colors-navbar-purple">
      <h2
        onClick={redirectHandle}
        className="mb-2 font-bold text-colors-header-purple text-sm  font-sans  overflow-y-auto cursor-pointer transition ease-in hover:underline"
      >
        {props.posts[index].title}
      </h2>
      <div className="grid grid-cols-3 grid-rows-1 font-bold text-sm font-sans h-7 ">
        {index - 1 >= 0 && (
          <button
            className="active:translate-y-0.5 col-start-1 col-end-1 text-colors-header-purple justify-self-start transition ease-in-out hover:opacity-60"
            onClick={backHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        <button
          className="shadow-md  active:translate-y-0.5 rounded-lg p-1 col-start-2 col-end-2 bg-gradient-to-b from-gray-300 to-colors-gradient-purple text-white transition ease-in-out hover:opacity-60"
          onClick={props.deleteFunction}
        >
          Close
        </button>
        {index + 1 < props.posts.length && (
          <button
            className="active:translate-y-0.5 justify-self-end col-start-3 col-end-3 text-colors-header-purple transition ease-in-out hover:opacity-60"
            onClick={nextHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
