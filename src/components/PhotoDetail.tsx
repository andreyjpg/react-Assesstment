import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotoById } from "../utils/unsplash";
import { Full } from "unsplash-js/dist/methods/photos/types";

const PhotoDetail = () => {
  const [photoDetails, setPhotoDetail] = useState<Full>();
  const { id = "" } = useParams();

  useEffect(() => {
    const run = async () => {
      const response = await getPhotoById(id);
      setPhotoDetail(response);
    };
    run();
  });
  return (
    <>
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="lg:flex">
          <img src={photoDetails?.urls.full} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-md text-indigo-500 font-bold">
            {photoDetails?.description}
          </div>
          <p className="mt-4 text-slate-500 text-left">
            {`${photoDetails?.user.first_name} ${
              photoDetails?.user.last_name || ""
            }`}
          </p>
          <div className="flex flex-row text-slate-500 gap-16 ">
            <p>
              <span className="font-bold">{photoDetails?.likes}</span> Likes
            </p>
          </div>
          <div className="flex flex-row justify-between">
            {photoDetails?.user.instagram_username ? (
              <p className="mt-2 text-slate-500">
                Instagram: {photoDetails?.user.instagram_username}
              </p>
            ) : null}
            {photoDetails?.promoted_at ? (
              <p className="mt-2 text-slate-500">
                Uploaded:{" "}
                {new Date(photoDetails?.created_at || "").toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoDetail;
