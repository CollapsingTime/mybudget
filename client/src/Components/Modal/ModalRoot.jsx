import React from "react";
import { useState, useEffect } from "react";
import ModalService from "./ModalService.jsx";
import { Backdrop } from "./Backdrop.jsx";

export default function ModalRoot() {
  const [modal, setModal] = useState({});
  useEffect(() => {
    ModalService.on("open", ({ component, props }) => {
      setModal({
        component,
        props,
        close: (value) => {
          setModal({});
        },
      });
    });
  }, []);

  const ModalComponent = modal.component ? modal.component : null;

  return (
    <>
      {modal.component ? (
        <Backdrop>
          {ModalComponent && (
            <ModalComponent {...modal.props} close={modal.close} />
          )}
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
}
