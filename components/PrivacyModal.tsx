// components/PrivacyModal.tsx
import { useRef } from 'preact/hooks'

export function PrivacyModal({
  onAccept,
  onClose,
}: {
  onAccept?: () => void
  onClose?: () => void
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const acceptAndProceed = () => {
    modalRef.current?.close()
    onAccept?.()
  }

  const declineAndClose = () => {
    modalRef.current?.close()
    onClose?.()
  }

  return (
    <>
      <dialog
        ref={modalRef}
        class='rounded-2xl max-w-lg w-full p-6 backdrop-blur-md bg-white/80 shadow-lg transition'
        onClick={(e) => {
          if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
            modalRef.current?.close()
          }
        }}
      >
        <div class='text-center'>
          <h3 class='text-lg font-semibold'>Datenschutzbestimmungen</h3>
          <p class='mt-2 text-sm text-gray-600'>
            Für die Fortsetzung müssen Sie den Datenschutzbestimmungen auf der
            folgenden Seite zustimmen. Alternativ können Sie anders bestellen.
          </p>
        </div>

        <div class='mt-6 flex space-x-4'>
          <button
            class='flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 text-lg font-medium'
            onClick={declineAndClose}
          >
            Ablehnen
          </button>
          <button
            class='flex-1 py-2 rounded-lg bg-blue-600 text-white text-lg font-medium'
            onClick={acceptAndProceed}
          >
            Zustimmen
          </button>
        </div>
      </dialog>
    </>
  )
}

// Export openModal function as an explicit helper function to call directly in `Cart`
export function useOpenModal(modalRef: React.RefObject<HTMLDialogElement>) {
  return () => modalRef.current?.showModal()
}
