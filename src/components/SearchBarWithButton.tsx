import React, { useState } from "react";

interface IProps {
  onClickSearch: (value: string) => any;
}

function SearchBarWithButton({ onClickSearch }: IProps) {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSearch(searchValue);
  };

  return (
    <div className="flex justify-center py-10 bg-stone-200">
      <form onSubmit={onSubmitForm} className="flex w-9/12 justify-center">
        <input
          type="text"
          className="w-6/12 p-4 focus:outline-none"
          placeholder="Search"
          onChange={onChange}
          value={searchValue}
        />
        <button
          type="submit"
          className="bg-blue-500 w-2/12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default SearchBarWithButton;
