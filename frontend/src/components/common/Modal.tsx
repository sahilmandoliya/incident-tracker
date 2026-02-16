import "./common.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-panel">
        {children}
      </div>
    </div>
  );
}
