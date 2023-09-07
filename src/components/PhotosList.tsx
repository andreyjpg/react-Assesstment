import useIntersectionObserver from "../utils/useIntesectionObserver";
import { Link } from "react-router-dom";
import { useContext } from "react";
import PhotoContext from "../context/PhotoContext";
import Error from "./Error";

const PhotosList = () => {
  const {
    photosList,
    nextPage,
    isLoading,
    showError,
    errorMessage,
    handleCloseError,
  } = useContext(PhotoContext);

  const lastPhotoRef = useIntersectionObserver<HTMLDivElement>(() => {
    void nextPage();
  }, [!isLoading]);

  return (
    <>
      {showError ? (
        <div className="flex justify-center mt-5">
          <Error handleCloseError={handleCloseError} message={errorMessage} />
        </div>
      ) : null}
      <div className="container mx-auto space-y-2 md:space-y-0 md:gap-2 md:grid md:grid-cols-4 mt-8">
        {photosList.map((photo, i, photos) => (
          <div
            key={photo.id}
            //Will ref the last photo of the list
            ref={photos.length - 1 === i ? lastPhotoRef : null}
            className="max-w-full rounded-lg rounded"
          >
            <Link to={`/photo/${photo.id}`} target="_blank">
              <img className="object-cover" src={photo.urls.regular} />
            </Link>
          </div>
        ))}
        {isLoading ? (
          <div
            id="spinner"
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PhotosList;
