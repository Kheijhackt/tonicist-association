import { useContext } from "react";
import ContentContext from "../utils/ContentContext";
import DisplayGallery from "../components/DisplayGallery";

function Gallery() {
  const rawContents = useContext(ContentContext);
  const contents = rawContents.gallery;
  console.log(contents);

  return (
    <>
      <h1>{contents.groupPhotos.title}</h1>
      <DisplayGallery images={contents.groupPhotos.images} />
      <br />
      <h1>· · ─ ·✶· ─ · ·</h1>
      <br />
      <h1>{contents.funnyMoments.title}</h1>
      <DisplayGallery images={contents.funnyMoments.images} />
    </>
  );
}

export default Gallery;
