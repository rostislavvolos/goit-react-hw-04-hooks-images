import styles from './Modal.module.css'
import {useEffect} from 'react'
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root');


const Modal = ({closeModal, children}) => {


  // componentDidMount() {
   
  // }


  // componentWillUnmount() {
    
  // }

  useEffect (() => {
    window.addEventListener('keydown', handelKeyClose);
    return () => {
      window.removeEventListener('keydown', handelKeyClose);
    }
  }, [])




  const handelKeyClose = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };



  const handelBecdropClose = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

    return createPortal(
      <div className={styles.Overlay} onClick={handelBecdropClose}>
    <div className={styles.Modal}>
      {children}
    </div>
  </div>,
  modalRoot
      )
  }

export default Modal;


