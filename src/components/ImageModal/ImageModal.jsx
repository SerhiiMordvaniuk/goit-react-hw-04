import Modal from "react-modal";
import s from "./ImageModal.module.css";
Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, image, alt }) => {
  const styles = {
    content: {
      overflow: "hidden",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      background: "transparent",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgb(39, 42, 40, 0.7)",
    },
  };
  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={styles}>
        <img src={image} alt={alt} />
      </Modal>
    </>
  );
};

export default ImageModal;
