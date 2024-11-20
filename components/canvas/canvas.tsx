
"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import {
  Eraser,
  Pen,
  Redo, 
  SquareX,
  Save,
  Undo,
  Grip,
  Paintbrush
} from "lucide-react";
import { TbBackground } from "react-icons/tb";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"




export default function Canvas() {
   const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#218cea");
  const [eraseMode, setEraseMode] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
 
  // newer features
  const [brushSize, setBrushSize] = useState(4); // Default size of 4
  const [opacity, setOpacity] = useState(100); // 100% opacity by default
  const [backgroundColor, setBackgroundColor] = useState('white');
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        handleClearClick();
      }
      // Add more shortcuts here
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
 
  const toggleDraggable = () => {
    setIsDraggable((prev) => !prev);
  };

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value);
  }

  function handleEraserClick() {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }

  function handlePenClick() {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }

  function handleUndoClick() {
    canvasRef.current?.undo();
  }

  function handleRedoClick() {
    canvasRef.current?.redo();
  }

  function handleClearClick() {
    canvasRef.current?.clearCanvas();
  }

  async function handleSave() {
    const dataURL = await canvasRef.current?.exportImage("png");
    if (dataURL) {
      const link = Object.assign(document.createElement("a"), {
        href: dataURL,
        style: { display: "none" },
        download: "sketch.png",
      });

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  const strokeColorWithOpacity = `${strokeColor}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Draggable disabled={!isDraggable} handle=".move-handle">
        <div
          className="flex flex-col gap-4"
          style={{
            maxWidth: "90%",
            margin: "0 auto",
            position: "relative",
  
          }}
        >
          <ResizableBox
            width={530}
            height={530}
            minConstraints={[530, 300]}
            maxConstraints={[1100, 600]}
            className="w-full h-full border-2 rounded-md"
            style={{
              border:`1px solid ${backgroundColor}`
            }}
          >
            <ReactSketchCanvas
              width="full"
              height="100%"
              ref={canvasRef}
              strokeColor={strokeColorWithOpacity}
              strokeWidth={brushSize}
              canvasColor={backgroundColor}
              className="cursor-cell"
            />
          </ResizableBox>

          <div className="flex justify-center 
          bg-neutral-100 rounded-full items-center 
          gap-6 divide-x-2 divide-emerald-200 py-2
          p-3
           ">
         
 

<Popover>
  <PopoverTrigger asChild>
                    <div>
                    <Button
  size="icon"
  type="button"
  variant="outline"
  onClick={handlePenClick}
  style={{
    border: `4px solid ${backgroundColor}`,
    background : backgroundColor === 'white' || '#fff' ? '#e7eaeb' : 'transparent',
  }}
  className="hover:bg-transparent rounded-full"
>
  <TbBackground
    size={18}
    style={{
      color: backgroundColor === '#00000000' ? 'black' : backgroundColor,
    }}
  />
</Button>


                    </div>
  </PopoverTrigger >

  <PopoverContent>
              <div className="flex justify-center items-center flex-col">
                <h1 className="font-mono text-sm mb-3">Canvas background</h1>
 <div className="w-full">

 <HexColorPicker 
color={backgroundColor}   
onChange={setBackgroundColor}
style={{
  width:'100%'
}}
/>
</div>

<Button 
variant='outline'
type="button"
onClick={()=>setBackgroundColor('#00000000')}
className="font-mono font-semibold mt-3"
>Set to transparent</Button>
</div>       
                    
                     
                     
 
   </PopoverContent>
</Popover>




 

            {/* Drawing mode */}
            <div className="flex items-center gap-3 pl-3">
              
      

<Popover>
  <PopoverTrigger asChild>
  <div>
                      <Button
                        size="icon"
                        type="button"
                        variant="outline"
                        disabled={!eraseMode}
                        onClick={handlePenClick}
                        className="rounded-full"
                        style={{
                          border: `5.9px solid ${strokeColor}`,
                        }}
                      >
                        <Paintbrush size={16} color={strokeColor} />
                      </Button>
                    </div>
  </PopoverTrigger >

  <PopoverContent>
              <div className="flex justify-center items-center flex-col gap-3">
              <h1 className="font-mono text-xl mb-3">Brush Options</h1>

             <div className="w-full">

              <HexColorPicker 
color={strokeColor}   
onChange={setStrokeColor} 
style={{
  width:'100%'
}}
/>
</div>


<div className="w-full mt-2">
                      <div className="flex justify-between">
                         <label className="block text-sm font-medium mb-1">Brush Size</label>
                        <span className="text-sm">{brushSize}px</span>
                         </div>
                         <Slider
  min={1}
  max={20}
  value={[brushSize]}
  onValueChange={(value) => setBrushSize(value[0])}
  className="w-full"
/>

 

                      </div>
                     
                      <div className="w-full mt-2">
                        <div className="flex justify-between">
                        <label className="block text-sm font-medium mb-1">Opacity</label>
                        <span className="text-sm">{opacity}%</span>
                        </div>
                       

<Slider
  min={0}
  max={100}
  value={[opacity]}
  onValueChange={(value) => setOpacity(value[0])}
  className="w-full"
/>


                      </div>


</div>       
                    
                     
                     
 
   </PopoverContent>
</Popover>
           

              <Button
                size="icon"
                type="button"
                variant="outline"
                disabled={eraseMode}
                onClick={handleEraserClick}
                className="rounded-full"
              >
                <Eraser size={16} />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center pl-3 gap-3">
              <Button
                size="icon"
                type="button"
                variant="outline"
                onClick={handleUndoClick}
                className="rounded-full"

              >
                <Undo size={16} />
              </Button>
              <Button
                size="icon"
                type="button"
                variant="outline"
                onClick={handleRedoClick}
                className="rounded-full"

              >
                <Redo size={16} />
              </Button>
              <Button
                size="icon"
                type="button"
                variant="outline"
                onClick={handleClearClick}
                className="rounded-full"

              >
                <SquareX size={16} />
              </Button>

              <Button
                size="icon"
                type="button"
                variant="outline"
                onClick={handleSave}
                className="rounded-full"

              >
                <Save size={16} />
              </Button>
            </div>

            {/* Move */}
            <div className="flex items-center pl-3 gap-3 ">
              <Button
                size="icon"
                type="button"
                variant={isDraggable ? "default" : "outline"}
                onClick={toggleDraggable}
                className="move-handle rounded-full"
              >
                <Grip size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
