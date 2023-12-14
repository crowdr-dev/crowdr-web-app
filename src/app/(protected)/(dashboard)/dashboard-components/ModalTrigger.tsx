import { useEffect, useRef } from "react"
import { Modal, ModalOptions } from "flowbite"

import { RFC } from "@/app/common/types"

const ModalTrigger: RFC<ModalTriggerProps> = ({
  id,
  type = "show",
  options = {},
  children,
  override,
}) => {
  const modal = useRef<Modal>()
  const modalEl = useRef<HTMLElement | null>()

  useEffect(() => {
    if (id) {
      const $modalEl = document.getElementById(id)
      modal.current = new Modal($modalEl, options)
      modalEl.current = $modalEl
    }
  }, [id])

  const trigger = () => {
    if (modal.current) {
      const $backdropEl = document.querySelector("[modal-backdrop]")
      modal.current[type]()

      if (type === "show") {
        $backdropEl?.classList.remove("hidden")
        modalEl.current?.classList.replace("hidden", "flex")
      } else if (type === "hide") {
        $backdropEl?.classList.add("hidden")
        modalEl.current?.classList.replace("flex", "hidden")
      } // TODO: HANDLE TOGGLE CASE
    }
  }

  const props: any = {}
  if (id) {
    props.onClick = trigger
  }

  return <span {...props}>{children}</span>
}

export default ModalTrigger

type ModalTriggerProps = {
  id: string
  children: React.ReactNode
  type?: "show" | "hide" | "toggle"
  options?: ModalOptions
  override?: boolean
}
