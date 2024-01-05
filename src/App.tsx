import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./App.css";

export default function App() {
  const defaultText = "";
  const defaultSize = 256;
  const defaultBgColor = "#FFFFFF";
  const defaultFgColor = "#000000";
  const defaultLevel = "H";
  const defaultIncludeMargin = false;

  const [text, setText] = useState(defaultText);
  const [size, setSize] = useState(defaultSize);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [fgColor, setFgColor] = useState(defaultFgColor);
  const [level, setLevel] = useState(defaultLevel);
  const [includeMargin, setIncludeMargin] = useState(defaultIncludeMargin);

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };

  const handleReset = () => {
    setText(defaultText);
    setSize(defaultSize);
    setBgColor(defaultBgColor);
    setFgColor(defaultFgColor);
    setLevel(defaultLevel);
    setIncludeMargin(defaultIncludeMargin);
  };

  return (
    <>
      <h1>QR Code Generator</h1>
      <div>
        <QRCodeSVG
          value={text}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
        {/* <input type="color" /> */}
      </div>
      <div>
        <textarea
          autoFocus
          value={text}
          placeholder="Type something here"
          maxLength={1000}
          rows={10}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div>
        <label>Background color:</label>
        <input
          type="color"
          value={bgColor}
          onChange={(event) => setBgColor(event.target.value)}
        />
        <label>Foreground color:</label>
        <input
          type="color"
          value={fgColor}
          onChange={(event) => setFgColor(event.target.value)}
        />
      </div>
      <div>
        <label>Error correction level:</label>
        <label>
          <input
            type="radio"
            value="L"
            checked={level === "L"}
            onChange={handleLevelChange}
          />
          L
        </label>
        <label>
          <input
            type="radio"
            value="M"
            checked={level === "M"}
            onChange={handleLevelChange}
          />
          M
        </label>
        <label>
          <input
            type="radio"
            value="Q"
            checked={level === "Q"}
            onChange={handleLevelChange}
          />
          Q
        </label>
        <label>
          <input
            type="radio"
            value="H"
            checked={level === "H"}
            onChange={handleLevelChange}
          />
          H
        </label>
      </div>
      <div>
        <label>
          Include margin?
          <input
            type="checkbox"
            checked={includeMargin}
            onChange={() => setIncludeMargin(!includeMargin)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}
