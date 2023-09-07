import { createApi } from "unsplash-js";
import { ColorId, Orientation } from "unsplash-js";
const accessKey = process.env.REACT_APP_UNSPLASH_KEY || "";

const unsplash = createApi({
  accessKey: accessKey,
});

const getPhotos = (
  query: string,
  color: ColorId | undefined,
  orientation: Orientation | undefined,
  page: number
) =>
  unsplash.search
    .getPhotos({
      query: query,
      perPage: 30,
      page: page,
      color: color,
      orientation: orientation,
    })
    .then((res) => {
      if (res.errors) {
        throw new Error(`Error ocurred: ${res.errors[0]}`);
      } else {
        const { results } = res.response;
        return results;
      }
    })
    .catch((err) => {
      throw new Error(`Error ocurred: ${err.message}`);
    });

const getPhotoById = (id: string) =>
  unsplash.photos
    .get({ photoId: id })
    .then((res) => {
      if (res.errors) {
        throw new Error(`Error ocurred: ${res.errors[0]}`);
      } else {
        return res.response;
      }
    })
    .catch((err) => {
      throw new Error(`Error ocurred: ${err.message}`);
    });

export { getPhotos, getPhotoById };
