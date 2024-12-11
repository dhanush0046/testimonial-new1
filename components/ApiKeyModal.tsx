// components/ApiKeyModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { generateApiKey, getApiKeys, deleteApiKey } from '@/lib/dashboardApi';
import { Copy } from 'lucide-react';

interface ApiKey {
  id: string;
  key?: string;
  createdAt: string;
}

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId: string;
}

export function ApiKeyModal({ isOpen, onClose, spaceId }: ApiKeyModalProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newApiKey, setNewApiKey] = useState<{ id: string; key: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchApiKeys();
    } else {
      setNewApiKey(null);
    }
  }, [isOpen, spaceId]);

  const fetchApiKeys = async () => {
    try {
      const keys = await getApiKeys(spaceId);
      setApiKeys(keys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to fetch API keys');
    }
  };

  const handleGenerateApiKey = async () => {
    setIsLoading(true);
    try {
      const apiKey = await generateApiKey(spaceId);
      setApiKeys(prev => [...prev, apiKey]);
      setNewApiKey({ id: apiKey.id, key: apiKey.key! });
      toast.success('API key generated successfully');
    } catch (error) {
      console.error('Error generating API key:', error);
      toast.error('Failed to generate API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteApiKey = async (apiKeyId: string) => {
    try {
      await deleteApiKey(spaceId, apiKeyId);
      setApiKeys(prev => prev.filter(key => key.id !== apiKeyId));
      // Clear newApiKey if the deleted key was the newly generated one
      if (newApiKey && newApiKey.id === apiKeyId) {
        setNewApiKey(null);
      }
      toast.success('API key deleted successfully');
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const handleCopyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>API Key Management</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Keep your API keys secure - they will only be shown once when generated.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Created: {new Date(key.createdAt).toLocaleString()}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteApiKey(key.id)}
              >
                Delete
              </Button>
            </div>
          ))}
          {newApiKey && (
            <div className="space-y-2">
              <div className="text-sm font-medium">New API Key Generated</div>
              <div className="flex items-center gap-2">
                <Input value={newApiKey.key} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyApiKey(newApiKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-yellow-600">
                Make sure to copy this key now. You won't be able to see it again!
              </p>
            </div>
          )}
          <Button 
            onClick={handleGenerateApiKey} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Generate New API Key'}
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}