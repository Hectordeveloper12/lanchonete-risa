import { useState, useEffect, useCallback } from 'react';
import { paymentsService } from '../services/paymentsService';
import { ordersService } from '../services/ordersService';
import { PaymentMethod, PaymentMethodLabels } from '../types';
import type { PaymentDto, OrderDto, CreatePaymentCommand } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreatePaymentCommand>({ orderId: '', amount: 0, method: PaymentMethod.Pix });
  const [dateFilter, setDateFilter] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [paymentsData, ordersData] = await Promise.all([
        paymentsService.getByDate(dateFilter || undefined),
        ordersService.getAll().catch(() => []),
      ]);
      setPayments(paymentsData);
      setOrders(ordersData);
    } catch {
      toast.error('Erro ao carregar pagamentos');
    } finally {
      setLoading(false);
    }
  }, [dateFilter]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleOrderSelect = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    setForm({ ...form, orderId, amount: order?.totalAmount ?? 0 });
  };

  const handleSubmit = async () => {
    if (!form.orderId || form.amount <= 0) {
      toast.error('Selecione um pedido e informe o valor');
      return;
    }
    try {
      await paymentsService.create(form);
      toast.success('Pagamento registrado!');
      setShowForm(false);
      setForm({ orderId: '', amount: 0, method: PaymentMethod.Pix });
      loadData();
    } catch {
      toast.error('Erro ao registrar pagamento');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1>💰 Pagamentos</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo Pagamento'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label style={{ marginRight: '0.5rem', fontWeight: 600 }}>Filtrar por data:</label>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#27ae60' }}>Total: R$ {total.toFixed(2)}</div>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>Registrar Pagamento</h3>
          <div className="form-group">
            <label>Pedido</label>
            <select value={form.orderId} onChange={(e) => handleOrderSelect(e.target.value)}>
              <option value="">Selecione um pedido...</option>
              {orders.map(o => (
                <option key={o.id} value={o.id}>Mesa {o.tableNumber} - R$ {o.totalAmount.toFixed(2)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Valor (R$)</label>
            <input type="number" step="0.01" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="form-group">
            <label>Método</label>
            <select value={form.method} onChange={(e) => setForm({ ...form, method: Number(e.target.value) as PaymentMethod })}>
              {Object.entries(PaymentMethodLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary" onClick={handleSubmit}>Registrar</button>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="empty-state">Nenhum pagamento encontrado</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.orderId.slice(0, 8)}...</td>
                  <td style={{ fontWeight: 600, color: '#27ae60' }}>R$ {payment.amount.toFixed(2)}</td>
                  <td>{PaymentMethodLabels[payment.method]}</td>
                  <td>{new Date(payment.paidAt).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
