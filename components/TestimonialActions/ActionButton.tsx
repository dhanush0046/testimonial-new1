import React from 'react'
import { Button } from "@/components/ui/button"
import { type LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
}

export function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <Button 
      size="sm" 
      onClick={onClick} 
      className="bg-white flex items-center px-2 text-black hover:bg-gray-100"
    >
      <Icon className="mr-1 h-4 w-4" />
      {label}
    </Button>
  )
}