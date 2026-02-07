import React from "react";
import "./Modal.css";

type Props = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  className?: string;
  center?: boolean;
};

const Modal: React.FC<Props> = ({
  children,
  footer,
  onClose,
  className,
  center,
}) => {
  return (
    <div
      className={`Modal-container ${center ? "Modal-container--center" : ""}`}
      onClick={onClose}
    >
      <div
        className={`Modal ${className || ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="Modal-content">{children}</div>
        {footer && <div className="Modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
