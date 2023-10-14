import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import errorImg from "../assets/error_500.jpg";

interface ErrorModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal = ({ open, setIsOpen }: ErrorModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={classNames("modal", "backdrop-blur-sm", {
          "modal-open": open,
        })}
      >
        <div className="modal-box relative" ref={modalRef}>
          <label
            className="absolute btn-ghost btn-circle btn btn-sm text-lg btn-primary right-3 top-3 hover:scale-105 transition-all duration-150"
            onClick={handleClose}
          >
            X
          </label>
          <div className="overflow-y-auto">
            <div className="mt-7 w-full flex justify-center">
              <img
                className="rounded-xl max-h-96"
                src={errorImg}
                alt={"Internal Server Error"}
              />
            </div>
            <p className="mb-7 mt-4 text-center text-base">
              Internal Server Error. Please try after some time.
            </p>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn gap-2 capitalize"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
