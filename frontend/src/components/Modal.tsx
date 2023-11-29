import React, { ReactNode, useRef } from 'react'

interface Props {
	children: ReactNode
	isOpen: boolean
	onClose: () => void
}

export const Modal = ({ children, isOpen, onClose }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	const handleClose = () => {
		onClose()
	}

	return (
		<>
			{isOpen && (
				<dialog ref={dialogRef}>
					{children}
					<button onClick={handleClose}>Close</button>
				</dialog>
			)}
		</>
	)
}

export default Modal
