import { useState } from 'react';
import { Button, Toggle, Icon } from '../components/ui';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <div className="font-mono text-primary-container text-xs mb-2 tracking-[0.4em] uppercase">
          Directory / Root / Settings
        </div>
        <h2 className="text-6xl font-black font-headline tracking-tighter text-on-surface">SETTINGS</h2>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bg-surface-container border-3 border-outline p-6 shadow-[8px_8px_0px_0px_#0e0e0e]">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
              <Icon name="settings" size={24} />
              System_Configuration
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface-container-low border-2 border-outline">
                <div>
                  <div className="font-headline font-bold text-sm uppercase">Notifications</div>
                  <div className="text-xs text-outline font-mono">Enable system notifications</div>
                </div>
                <Toggle checked={notifications} onChange={setNotifications} label={notifications ? 'ON' : 'OFF'} />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low border-2 border-outline">
                <div>
                  <div className="font-headline font-bold text-sm uppercase">Dark_Mode</div>
                  <div className="text-xs text-outline font-mono">Enable dark theme</div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} label={darkMode ? 'ON' : 'OFF'} />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low border-2 border-outline">
                <div>
                  <div className="font-headline font-bold text-sm uppercase">Auto_Save</div>
                  <div className="text-xs text-outline font-mono">Automatically save changes</div>
                </div>
                <Toggle checked={autoSave} onChange={setAutoSave} label={autoSave ? 'ON' : 'OFF'} />
              </div>
            </div>
          </section>

          <section className="bg-surface-container border-3 border-outline p-6 shadow-[8px_8px_0px_0px_#0e0e0e]">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
              <Icon name="terminal" size={24} />
              Operator_Profile
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low border-2 border-outline">
                <div className="text-[10px] font-mono text-outline uppercase mb-1">Operator_ID</div>
                <div className="font-headline font-bold">OPERATOR_01</div>
              </div>
              <div className="p-4 bg-surface-container-low border-2 border-outline">
                <div className="text-[10px] font-mono text-outline uppercase mb-1">Access_Level</div>
                <div className="font-headline font-bold text-primary-container">ADMIN</div>
              </div>
              <div className="p-4 bg-surface-container-low border-2 border-outline">
                <div className="text-[10px] font-mono text-outline uppercase mb-1">Node_Location</div>
                <div className="font-headline font-bold">DC_NORTH_04</div>
              </div>
              <div className="p-4 bg-surface-container-low border-2 border-outline">
                <div className="text-[10px] font-mono text-outline uppercase mb-1">Session_Status</div>
                <div className="font-headline font-bold text-primary-container flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-container animate-pulse"></span>
                  ACTIVE
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-surface-container border-3 border-outline p-6 shadow-[8px_8px_0px_0px_#0e0e0e]">
            <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">Danger_Zone</h3>
            <div className="space-y-4">
              <Button variant="danger" size="md" className="w-full">
                CLEAR_CACHE
              </Button>
              <Button variant="danger" size="md" className="w-full">
                RESET_SETTINGS
              </Button>
              <Button variant="danger" size="md" className="w-full">
                TERMINATE_SESSION
              </Button>
            </div>
          </section>

          <section className="bg-surface-container-lowest border-3 border-outline p-6">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest text-outline mb-4">System_Info</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-outline">VERSION</span>
                <span className="text-on-surface">V4.2.0_STABLE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">BUILD</span>
                <span className="text-on-surface">2024.05.21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">UPTIME</span>
                <span className="text-on-surface">14D:32H:01M</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-16 bg-surface-container-highest border-t-3 border-[#9c8f79] px-6 py-2 flex justify-between items-center text-[10px] font-mono tracking-widest text-on-surface-variant">
        <div className="flex gap-6">
          <span>SYSTEM_STATUS: <span className="text-primary-container">OPTIMAL</span></span>
          <span>LATENCY: 14MS</span>
          <span>DATABASE: SYNCED</span>
        </div>
        <div>
          <span>© 2024 HIVEMIND COMMAND</span>
        </div>
      </footer>
    </div>
  );
}