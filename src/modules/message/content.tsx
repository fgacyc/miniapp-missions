import { useNavigate, useParams } from "react-router-dom";
import { useMessages } from "../../store/useMessages";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
// import { marked } from "marked";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

// import { t } from "i18next";

const MessageContent = () => {
  const params = useParams();
  const id = Number(params.id);
  const messages = useMessages();
  const setMessage = messages.setMessage;
  const content = messages[id];
  const allIds = Object.keys(messages)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key));

  const navigate = useNavigate();
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch(`${import.meta.env["VITE_API_URL"]}messages/${id}`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok) {
          //   console.log(data.data);
          setLoading(false);
          setMessage(id, data.data);
        }
      })
    );
  }, [id, setMessage]);

  // const generatePDFfromMarkdown = async () => {
  //   try {
  //     // Step 1: Convert Markdown to HTML
  //     const htmlContent = await marked(content.content);

  //     // Create a hidden element to render HTML content
  //     const hiddenDiv = document.createElement("div");
  //     hiddenDiv.classList.add("prose", "p-6");
  //     hiddenDiv.style.position = "absolute";
  //     hiddenDiv.style.left = "-9999px";
  //     hiddenDiv.style.width = "210mm"; // A4 size width
  //     hiddenDiv.innerHTML =
  //       `<p style="text-align:center; width: 100%; font-weight: bold; font-size: 48px;">${content.title}</p>` +
  //       htmlContent;
  //     document.body.appendChild(hiddenDiv);

  //     // Step 2: Convert HTML to Canvas
  //     const canvas = await html2canvas(hiddenDiv, { useCORS: true });

  //     // Remove the hidden div after capturing the content
  //     document.body.removeChild(hiddenDiv);

  //     // Prepare PDF Document
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const canvasWidth = canvas.width;
  //     const canvasHeight = canvas.height;
  //     const scaleFactor = pdfWidth / canvasWidth;
  //     const pageHeight = pdfHeight / scaleFactor; // Height in canvas units to fit on one PDF page

  //     // Loop Through the Content and Add Pages
  //     let position = 0;
  //     const contentHeight = canvasHeight;

  //     while (position < contentHeight) {
  //       // Create a canvas for each slice
  //       const canvasSlice = document.createElement("canvas");
  //       canvasSlice.width = canvasWidth;
  //       canvasSlice.height = Math.min(pageHeight, contentHeight - position);

  //       const context = canvasSlice.getContext("2d");
  //       context?.drawImage(
  //         canvas,
  //         0,
  //         position,
  //         canvasWidth,
  //         canvasSlice.height,
  //         0,
  //         0,
  //         canvasWidth,
  //         canvasSlice.height
  //       );

  //       // Convert the slice to an image
  //       const sliceData = canvasSlice.toDataURL("image/png");
  //       pdf.addImage(
  //         sliceData,
  //         "PNG",
  //         0,
  //         0,
  //         pdfWidth,
  //         (canvasSlice.height * pdfWidth) / canvasWidth
  //       );

  //       // Check if content fits in the current page
  //       const remainingHeight = contentHeight - position - canvasSlice.height;
  //       if (remainingHeight > 0) {
  //         // Add a new page if content still remains
  //         pdf.addPage();
  //       }

  //       position += canvasSlice.height;
  //     }
  //     pdf.save(`${content.title}.pdf`); // Trigger the download of the PDF
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error. Something unexpected happened.");
  //   }
  // };

  return (
    <div className="py-3 flex flex-col w-full gap-5">
      <div>
        <div className="flex relative flex-row items-center justify-between">
          {allIds.includes(Number(id - 1)) ? (
            <IoChevronBackSharp
              onClick={() => navigate(`/message/${id - 1}`)}
              size={30}
              className="-translate-x-1/2"
            />
          ) : (
            <div className="w-[30px] h-[30px]" />
          )}
          {!loading && (
            <h1 className="font-extrabold text-3xl text-center w-[70%]">
              {content.title}
            </h1>
          )}
          {allIds.includes(Number(id + 1)) ? (
            <IoChevronForwardSharp
              onClick={() => navigate(`/message/${id + 1}`)}
              size={30}
              className="translate-x-1/2"
            />
          ) : (
            <div className="w-[30px] h-[30px]" />
          )}
        </div>
        {/* {console.log(content)} */}
        {!loading && (
          <div className="w-full text-lg text-[#92969D] text-center pt-2">
            {content.verse}
          </div>
        )}
      </div>
      {!loading && (
        <div className="flex flex-col w-full">
          {/* <h2 className="font-bold text-2xl">{t("messagetab.introduction")}</h2> */}
          <Markdown className="text-justify prose">{content.content}</Markdown>
        </div>
      )}

      {/* <button
        onClick={() => generatePDFfromMarkdown()}
        className="bg-black text-white text-lg rounded-full w-full py-3"
      >
        {t("messagetab.save_this_sermon")}
      </button> */}
    </div>
  );
};

export default MessageContent;
