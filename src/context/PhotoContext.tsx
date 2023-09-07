import { createContext, useState, useEffect, Dispatch, ReactNode } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { getPhotos } from "../utils/unsplash";
import { ColorId, Orientation } from "unsplash-js";
import { ORIENTATION } from "../utils/FilterConst";

type InitialState = {
  photosList: Basic[];
  setPhotoList: Dispatch<React.SetStateAction<Basic[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  nextPage: () => Promise<void>;
  setQuery: Dispatch<React.SetStateAction<string>>;
  color: ColorId | undefined;
  orientation: Orientation | undefined;
  showError: boolean;
  errorMessage: string;
  handleCloseError: () => void;
  handleSelectChange: (value: ColorId | Orientation) => void;
};

const PhotoContext = createContext<InitialState>({} as InitialState);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photosList, setPhotoList] = useState<Basic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [color, setColor] = useState<ColorId | undefined>(undefined);
  const [orientation, setOrientation] = useState<Orientation | undefined>(
    undefined
  );
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nextPage = async () => {
    const newPage = currentPage + 1;
    const response = await getPhotos(query, color, orientation, newPage);

    setPhotoList((prevState) => [...prevState, ...(response as Basic[])]);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoading(true);
        const response = await getPhotos(query, color, orientation, 1);
        setPhotoList(response as Basic[]);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err + "");
        setShowError(true);
      }
    };
    run();
  }, [query, color, orientation]);

  function isOrientation(value: ColorId | Orientation): value is Orientation {
    return ORIENTATION.includes(value as Orientation);
  }

  const handleSelectChange = (value: ColorId | Orientation) => {
    if (isOrientation(value)) {
      setOrientation(value);
    } else {
      setColor(value);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
    setErrorMessage("");
  };

  const valueContext = {
    photosList,
    setPhotoList,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    nextPage,
    setQuery,
    color,
    orientation,
    handleSelectChange,
    showError,
    errorMessage,
    handleCloseError,
  };
  return (
    <PhotoContext.Provider value={valueContext}>
      {children}
    </PhotoContext.Provider>
  );
}

export default PhotoContext;
