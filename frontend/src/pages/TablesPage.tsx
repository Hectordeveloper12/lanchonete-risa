import { useState, useEffect } from 'react';
import { tablesService } from '../services/tablesService';
import type { TableDto } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function TablesPage() {
  const [tables, setTables] = useState<TableDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [tableNumber, setTableNumber] = useState(1);
  const [batchMode, setBatchMode] = useState(false);
  const [batchStart, setBatchStart] = useState(1);
  const [batchEnd, setBatchEnd] = useState(10);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await tablesService.getAll();
      setTables(data);
    } catch {
      toast.error('Erro ao carregar mesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async () => {
    try {
      if (batchMode) {
        await tablesService.createBatch({ startNumber: batchStart, endNumber: batchEnd });
        toast.success(`Mesas ${batchStart} a ${batchEnd} criadas!`);
      } else {
        await tablesService.create({ number: tableNumber });
        toast.success(`Mesa ${tableNumber} criada!`);
      }
      setShowForm(false);
      loadData();
    } catch {
      toast.error('Erro ao criar mesa(s)');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🪑 Mesas</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nova Mesa'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>Criar Mesa(s)</h3>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={batchMode} onChange={(e) => setBatchMode(e.target.checked)} />
              {' '}Criar em lote
            </label>
          </div>
          {batchMode ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>De (número)</label>
                <input type="number" min="1" value={batchStart} onChange={(e) => setBatchStart(parseInt(e.target.value) || 1)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Até (número)</label>
                <input type="number" min="1" value={batchEnd} onChange={(e) => setBatchEnd(parseInt(e.target.value) || 1)} />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label>Número da Mesa</label>
              <input type="number" min="1" value={tableNumber} onChange={(e) => setTableNumber(parseInt(e.target.value) || 1)} />
            </div>
          )}
          <button className="btn-primary" onClick={handleCreate}>Criar</button>
        </div>
      )}

      {tables.length === 0 ? (
        <div className="empty-state">Nenhuma mesa encontrada</div>
      ) : (
        <div className="grid-cards">
          {tables.map(table => (
            <div key={table.id} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪑</div>
              <h3 style={{ margin: '0 0 0.5rem' }}>Mesa {table.number}</h3>
              <span className={`badge ${table.isActive ? '' : ''}`} style={{ backgroundColor: table.isActive ? '#2ecc71' : '#e74c3c' }}>
                {table.isActive ? 'Ativa' : 'Inativa'}
              </span>
              {table.qrCodeUrl && (
                <div style={{ marginTop: '0.75rem' }}>
                  <a href={table.qrCodeUrl} target="_blank" rel="noopener noreferrer" className="btn-small">📱 QR Code</a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
