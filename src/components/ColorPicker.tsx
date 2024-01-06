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
      {desc ? <div className="color-desc">{desc}</div> : null}
      <input
        type="color"
        value={color}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
