import { useState, useEffect } from "react";
import "./error-toast.css";

interface IErrorToastProps {
  message: string;
}

const ErrorToast = ({ message }: IErrorToastProps) => {
  const [open, setOpen] = useState(true);

  // Close the toast after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000);
    // Clear the timeout if the component unmount
    return () => clearTimeout(timer);
  }, [message]);

  if (!open) return null;

  return (
    <div className="errorToast">
      <p>{message}</p>
      <button className="close" onClick={() => setOpen(false)}>
        x
      </button>
    </div>
  );
};

export default ErrorToast;
