import { ChatPanel } from './components/ChatPanel';
import { useCLISession } from './hooks/useCLISession';
import './App.css';

function App() {
  const {
    activeSession,
    sendMessage,
  } = useCLISession();

  const handleSendMessage = async (message: string) => {
    if (activeSession) {
      await sendMessage(activeSession.id, message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CLI Nexus</h1>
        <p className="subtitle">Universal interface for coding CLIs</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>Sessions</h2>
            <p className="coming-soon">Session management coming soon...</p>
          </div>
          <div className="sidebar-section">
            <h2>CLIs</h2>
            <p className="coming-soon">CLI configuration coming soon...</p>
          </div>
        </aside>

        <section className="content">
          {activeSession ? (
            <ChatPanel
              sessionId={activeSession.id}
              messages={activeSession.messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="welcome">
              <h2>Welcome to CLI Nexus</h2>
              <p>
                This is the beginning of a universal interface for coding CLIs.
              </p>
              <p className="status">
                🚧 Currently in early development
              </p>
              <div className="next-steps">
                <h3>Next Steps:</h3>
                <ul>
                  <li>Implement CLI process management</li>
                  <li>Add session persistence</li>
                  <li>Build configuration UI</li>
                  <li>Add syntax highlighting</li>
                </ul>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
