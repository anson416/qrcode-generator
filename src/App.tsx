import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Switch from "./components/Switch";
import ColorPicker from "./components/ColorPicker";
import useLocalStorage from "use-local-storage";
import "./App.css";

export default function App() {
  const defaultText = "";
  const defaultSize = 256;
  const defaultBgColor = "#FFFFFF";
  const defaultFgColor = "#000000";
  const defaultLevel = "H";
  const defaultIncludeMargin = false;

  const errorCorrectionLevels = ["Low", "Medium", "Quartile", "High"];

  const [isDark, setIsDark] = useLocalStorage(
    "isDark",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [text, setText] = useState(defaultText);
  const [size, setSize] = useState(defaultSize);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [fgColor, setFgColor] = useState(defaultFgColor);
  const [level, setLevel] = useState(defaultLevel);
  const [includeMargin, setIncludeMargin] = useState(defaultIncludeMargin);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setText(defaultText);
    setSize(defaultSize);
    setBgColor(defaultBgColor);
    setFgColor(defaultFgColor);
    setLevel(defaultLevel);
    setIncludeMargin(defaultIncludeMargin);
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvasElement = qrCodeRef.current.querySelector("canvas");
      if (canvasElement) {
        const url = canvasElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        link.click();
      }
    }
  };

  return (
    <>
      <div className="app" data-theme={isDark ? "dark" : "light"}>
        <div className="box dark-switch">
          <Switch
            isChecked={isDark}
            setAction={setIsDark}
            prefix="Light"
            suffix="Dark"
          />
        </div>
        <h1 className="title">QR Code Generator</h1>
        <div ref={qrCodeRef}>
          <QRCodeCanvas
            value={text}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
            includeMargin={includeMargin}
          />
        </div>
        <div>
          <textarea
            className="box"
            autoFocus
            value={text}
            placeholder="Type something here"
            maxLength={1000}
            rows={5}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div>
          <ColorPicker
            color={bgColor}
            onChange={setBgColor}
            desc="Background color:"
          />
          <ColorPicker
            color={fgColor}
            onChange={setFgColor}
            desc="Foreground color:"
          />
        </div>
        <div>
          <div className="dropdown-container">
            <label className="dropdown-desc">Error correction level:</label>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
              {errorCorrectionLevels.map((item) => (
                <option value={item[0]}>{item}</option>
              ))}
            </select>
          </div>
          <Switch
            isChecked={includeMargin}
            setAction={setIncludeMargin}
            prefix="Margin"
          />
        </div>
        <div className="box">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}
