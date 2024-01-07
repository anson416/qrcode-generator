import "./ColorPicker.css";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  desc?: string;
}

export default function ColorPicker(props: ColorPickerProps) {
  const { color, onChange, desc } = props;
  return (
    <div className="color-container">
      {desc ? <label className="color-desc">{desc}</label> : null}
      <input
        type="color"
        className="color"
        value={color}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
