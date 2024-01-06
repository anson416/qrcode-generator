import "./Switch.css";

interface SwitchProps {
  isChecked: boolean;
  setAction: (isChecked: boolean) => void;
  desc?: string;
}

export default function Switch(props: SwitchProps) {
  const { isChecked, setAction, desc } = props;
  return (
    <div className="switch-container">
      {desc ? <div className="switch-desc">{desc}</div> : null}
      <div
        className={`switch ${isChecked ? "switch-on" : "switch-off"}`}
        onClick={() => setAction(!isChecked)}
      >
        <div
          className={`switch-handle ${
            isChecked ? "switch-handle-on" : "switch-handle-off"
          }`}
        />
      </div>
    </div>
  );
}
