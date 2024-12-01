import React from 'react'
import Modal from '@/components/Modal'

interface DeleteConfirmProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirm({ isOpen, onClose, onConfirm }: DeleteConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Delete this testimonial</h2>
        <p className="text-gray-600">
          Once confirmed, this testimonial will be permanently removed.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}