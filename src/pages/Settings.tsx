import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Key, Webhook, Bell } from 'lucide-react';
import { useAppStore } from '../store';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../components/ui';
import { useCopy } from '../hooks';
import { mockApiKeys } from '../data/mockData';
import { formatDateTime } from '../utils';

export const Settings: React.FC = () => {
  const { profile, toggleDarkMode } = useAppStore();
  const { copy, copied } = useCopy();
  const [showWallet, setShowWallet] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your merchant profile and security.</p>
        </div>

        {/* Profile Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Merchant Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Merchant Name
                  </label>
                  <Input value={profile.name} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Email
                  </label>
                  <Input value={profile.email} readOnly />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Notification Email
                </label>
                <Input value={profile.notificationEmail || ''} readOnly />
              </div>
              <div>
                <Button variant="outline">Edit Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Wallet Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Primary Wallet Address
                </label>
                <div className="flex gap-2">
                  <Input
                    type={showWallet ? 'text' : 'password'}
                    value={profile.walletAddress}
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowWallet(!showWallet)}
                  >
                    {showWallet ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copy(profile.walletAddress)}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Button variant="outline">Update Wallet</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Account */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bank Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-blue-900">
                  Bank account ending in {profile.bankAccount} is configured for automatic
                  payouts.
                </p>
              </div>
              <div>
                <Button variant="outline">Update Bank Account</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApiKeys.map((key) => (
                <div key={key.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-900">{key.name}</h4>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          key.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {key.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">API Key</p>
                      <div className="flex gap-2">
                        <code className="flex-1 p-2 bg-slate-100 rounded text-xs font-mono break-all">
                          {key.key}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copy(key.key)}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Last Used</p>
                      <p className="text-sm text-slate-700">
                        {key.lastUsed
                          ? formatDateTime(key.lastUsed)
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Generate New API Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5" />
              Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Webhook URL
                </label>
                <Input value={profile.webhookUrl || ''} readOnly />
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900">
                  Webhooks are configured to send transaction events to your endpoint.
                </p>
              </div>
              <div>
                <Button variant="outline">Edit Webhook URL</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 'email_confirmed',
                  label: 'Email on Confirmed Transactions',
                  checked: true,
                },
                {
                  id: 'email_failed',
                  label: 'Email on Failed Transactions',
                  checked: true,
                },
                {
                  id: 'email_payout',
                  label: 'Email on Payout Processed',
                  checked: true,
                },
                {
                  id: 'push_alerts',
                  label: 'Push Alerts for High-Value Transactions',
                  checked: false,
                },
              ].map((notif) => (
                <label
                  key={notif.id}
                  className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    defaultChecked={notif.checked}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {notif.label}
                  </span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={profile.darkModeEnabled}
                  onChange={toggleDarkMode}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">
                  Dark Mode
                </span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
