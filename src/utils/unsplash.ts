import { createApi } from "unsplash-js";
import { ColorId, Orientation } from "unsplash-js";
const accessKey = "FUUHLKjwvoaJwFT8L7zjQdmkVZrct9T_RZ0eK2YGuFg";

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
        console.error("error ocurred", res.errors[0]);
      } else {
        const { results } = res.response;
        return results;
      }
    });

const getPhotoById = (id: string) =>
  unsplash.photos.get({ photoId: id }).then((res) => {
    if (res.errors) {
      console.error("error ocurred", res.errors[0]);
    } else {
      return res.response;
    }
  });

export { getPhotos, getPhotoById };
