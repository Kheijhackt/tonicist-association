import { useContext } from "react";
import ContentContext from "../utils/ContentContext";
import CollapsibleList from "../components/CollapsibleList";

function Faqs() {
  const rawContents = useContext(ContentContext);

  const contents = rawContents.resources;
  const resources = contents.items;

  return (
    <>
      <h1>{contents.title}</h1>
      <CollapsibleList
        items={resources}
        fieldMap={{
          heading: "textHeader",
          content: "textContent",
          pdf: "pdfPath",
        }}
      />
    </>
  );
}

export default Faqs;
