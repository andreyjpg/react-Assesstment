type Props = {
  handleChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ handleChange }: Props) => {
  let timeout: NodeJS.Timeout;
  const handleTyping = (value: string) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      handleChange(value);
    }, 1000);
  };

  return (
    <label className="w-72">
      <span className="block text-lg font-medium text-slate-700 text-black text-left">
        Search
      </span>
      <input
        type="text"
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          handleTyping(event.currentTarget.value)
        }
        className="relative mt-2 w-full cursor-default rounded-lg text-black bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 sm:text-sm"
      />
    </label>
  );
};

export default SearchBar;
