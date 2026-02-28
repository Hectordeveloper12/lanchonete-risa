import { useState, useEffect } from 'react';
import { sessionsService } from '../services/sessionsService';
import { tablesService } from '../services/tablesService';
import { TableSessionStatus } from '../types';
import type { TableSessionDto, TableDto } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<TableSessionDto[]>([]);
  const [tables, setTables] = useState<TableDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsData, tablesData] = await Promise.all([
        sessionsService.getActive(),
        tablesService.getAll().catch(() => []),
      ]);
      setSessions(sessionsData);
      setTables(tablesData);
    } catch {
      toast.error('Erro ao carregar sessões');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpen = async () => {
    if (!selectedTable) {
      toast.error('Selecione uma mesa');
      return;
    }
    try {
      await sessionsService.open(selectedTable);
      toast.success('Sessão aberta!');
      setSelectedTable('');
      loadData();
    } catch {
      toast.error('Erro ao abrir sessão');
    }
  };

  const handleClose = async (id: string) => {
    try {
      await sessionsService.close(id);
      toast.success('Sessão fechada!');
      loadData();
    } catch {
      toast.error('Erro ao fechar sessão');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔓 Sessões Ativas</h1>
      </div>

      <div className="card form-card">
        <h3>Abrir Nova Sessão</h3>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Mesa</label>
            <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
              <option value="">Selecione uma mesa...</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>Mesa {t.number}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary" onClick={handleOpen}>Abrir Sessão</button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="empty-state">Nenhuma sessão ativa</div>
      ) : (
        <div className="sessions-grid">
          {sessions.map(session => (
            <div key={session.id} className="session-card">
              <h3>
                Mesa {session.tableNumber}
                <span className={`session-status ${session.status === TableSessionStatus.Open ? 'open' : 'closed'}`}>
                  {session.status === TableSessionStatus.Open ? 'Aberta' : 'Fechada'}
                </span>
              </h3>
              <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', color: '#666' }}>
                Aberta em: {new Date(session.openedAt).toLocaleString('pt-BR')}
              </p>
              {session.closedAt && (
                <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>
                  Fechada em: {new Date(session.closedAt).toLocaleString('pt-BR')}
                </p>
              )}
              {session.status === TableSessionStatus.Open && (
                <button className="btn-danger-small" onClick={() => handleClose(session.id)} style={{ marginTop: '0.75rem' }}>
                  Fechar Sessão
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
