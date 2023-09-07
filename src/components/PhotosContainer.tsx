import PhotosList from "./PhotosList";
import SearchContainer from "./SearchContainer";
import { PhotoProvider } from "../context/PhotoContext";

const PhotosContainer = () => {
  return (
    <PhotoProvider>
      <div>
        <SearchContainer />
        <PhotosList />
      </div>
    </PhotoProvider>
  );
};

export default PhotosContainer;
