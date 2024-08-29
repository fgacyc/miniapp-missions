import { useEffect, useRef } from "react";

export const DesignCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const img = new Image;

  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    img.onload = function() {
        //Draw the original image so that you can fetch the colour data
        ctx?.drawImage(img,0,0);
        let imgData = ctx?.getImageData(0, 0, ref.current.width, ref.current.height);
        
        /*
        imgData.data is a one-dimensional array which contains 
        the respective RGBA values for every pixel 
        in the selected region of the context 
        (note i+=4 in the loop)
        */
        
        for (let i = 0; i < imgData.data.length; i+=4) {
                imgData.data[i] = 255; //Red, 0-255
                imgData.data[i+1] = 255; //Green, 0-255
                imgData.data[i+2] = 255; //Blue, 0-255
                /* 
                imgData.data[i+3] contains the alpha value
                which we are going to ignore and leave
                alone with its original value
                */
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the original image
        ctx.putImageData(imgData, 0, 0); //paint the new colorised image
    }
    
    //Load the image!
    img.src = src;
  }, [img]);

  return <canvas ref={ref} width={1080} height={1080} />;
};
