import React, { useState } from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import Modal from './Modal';
const Back = () => {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    }
    
    return (
        <>
            {showModal && <Modal setShowModal={setShowModal} showBack={true}></Modal>}
            <div onClick={handleClick} style={{ display: 'flex', alignItems: 'center', fontWeight: '500', width: 'fit-content', backgroundColor: '#ebe1e1', padding: '5px', borderRadius: '3px', cursor: 'pointer', marginLeft: '5px' }}><IoArrowBackCircle size={20} color='violet'></IoArrowBackCircle>Back</div>
        </>

    )
}

export default Back