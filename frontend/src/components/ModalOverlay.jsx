const ModalOverlay = ({ onClick }) => (
  <div className="fixed inset-0 bg-black/60 z-[999]" onClick={onClick} />
);

export default ModalOverlay;