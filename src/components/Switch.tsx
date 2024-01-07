import "./Switch.css";

interface SwitchProps {
  isChecked: boolean;
  setAction: (isChecked: boolean) => void;
  prefix?: string;
  suffix?: string;
}

export default function Switch(props: SwitchProps) {
  const { isChecked, setAction, prefix, suffix } = props;
  return (
    <div className="switch-container">
      {prefix ? <label className="switch-prefix">{prefix}</label> : null}
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
      {suffix ? <label className="switch-suffix">{suffix}</label> : null}
    </div>
  );
}
