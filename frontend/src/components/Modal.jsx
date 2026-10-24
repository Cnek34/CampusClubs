import ModalOverlay from "@components/ModalOverlay"

const Modal = ({ onClose, children }) => {
    return (
        <>
            <div 
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] 
                    w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto
                    bg-white rounded-xl
                    shadow-[0px_24px_32px_rgba(0,0,0,0.04),0px_16px_24px_rgba(0,0,0,0.04),0px_4px_8px_rgba(0,0,0,0.04),0px_0px_1px_rgba(0,0,0,0.04)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div >{children}</div>
            </div>
            <ModalOverlay onClick={onClose} />
        </>
    );
};

export default Modal;