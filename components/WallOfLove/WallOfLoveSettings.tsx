// //components/WallOfLove/WallOfLoveSettings.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Space, WallOfLoveSettings } from '@/types/space'

interface WallOfLoveSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (settings: Partial<WallOfLoveSettings>) => Promise<void>
  currentSettings: WallOfLoveSettings
  space: Space | null
}

export default function WallOfLoveSettingsModal({
  isOpen,
  onClose,
  onUpdate,
  currentSettings,
  space
}: WallOfLoveSettingsModalProps) {
  const [settings, setSettings] = useState<WallOfLoveSettings>(currentSettings)

  const handleSave = async () => {
    await onUpdate(settings)
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Wall of Love settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="customization">More customization</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // Handle logo upload
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor="spaceName">Name</Label>
                <Input
                  id="spaceName"
                  name="spaceName"
                  value={space?.spaceName ?? ''}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="topBannerText">Hero title</Label>
                <Input
                  id="topBannerText"
                  name="topBannerText"
                  value={settings.topBannerText}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="topBannerButtonText">CTA button</Label>
                <div className="flex space-x-2">
                  <Input
                    id="topBannerButtonText"
                    name="topBannerButtonText"
                    value={settings.topBannerButtonText}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="shareableLink"
                    value={space?.shareableLink || ''}
                    onChange={handleInputChange}
                    placeholder="https://"
                    disabled
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="customization">
            <div className="space-y-4">
              <div>
                <Label htmlFor="showBorder">Show border</Label>
                <Switch
                  id="showBorder"
                  name="showBorder"
                  checked={settings.showBorder}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showBorder: checked }))}
                />
              </div>
              <div>
                <Label htmlFor="borderRadius">Border radius</Label>
                <select
                  id="borderRadius"
                  name="borderRadius"
                  value={settings.borderRadius}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <Label htmlFor="borderColor">Border color</Label>
                <Input
                  id="borderColor"
                  name="borderColor"
                  type="color"
                  value={settings.borderColor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="borderThickness">Border thickness (px)</Label>
                <Input
                  id="borderThickness"
                  name="borderThickness"
                  type="number"
                  min="1"
                  max="10"
                  value={settings.borderThickness}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}