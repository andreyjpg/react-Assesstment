import { COLORS, ORIENTATION } from "../utils/FilterConst";
import Select from "./Select";
import SearchBar from "./SearchBar";
import PhotoContext from "../context/PhotoContext";
import { useContext } from "react";

const SearchContainer = () => {
  const { setQuery, color, orientation, handleSelectChange } =
    useContext(PhotoContext);
  return (
    <div className="flex md:flex-row flex-col bg-white md:w-full rounded-md p-5 shadow-md gap-8 md:justify-evenly justify-center">
      <SearchBar handleChange={setQuery} />
      <Select
        label={"Colors"}
        options={COLORS}
        selected={color}
        handleChange={handleSelectChange}
      />
      <Select
        label={"Orientation"}
        options={ORIENTATION}
        selected={orientation}
        handleChange={handleSelectChange}
      />
    </div>
  );
};

export default SearchContainer;
