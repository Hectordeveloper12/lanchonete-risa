import { useState, useEffect } from 'react';
import { ordersService } from '../services/ordersService';
import { sessionsService } from '../services/sessionsService';
import { productsService } from '../services/productsService';
import { OrderStatus, OrderStatusLabels } from '../types';
import type { OrderDto, TableSessionDto, ProductDto, CreateOrderItemCommand } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Received]: '#3498db',
  [OrderStatus.InPreparation]: '#f39c12',
  [OrderStatus.Ready]: '#2ecc71',
  [OrderStatus.Delivered]: '#27ae60',
  [OrderStatus.Cancelled]: '#e74c3c',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [sessions, setSessions] = useState<TableSessionDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderItems, setOrderItems] = useState<CreateOrderItemCommand[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, sessionsData, productsData] = await Promise.all([
        ordersService.getAll(),
        sessionsService.getActive().catch(() => []),
        productsService.getAll().catch(() => []),
      ]);
      setOrders(ordersData);
      setSessions(sessionsData);
      setProducts(productsData);
    } catch {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddItem = () => {
    if (products.length === 0) return;
    setOrderItems([...orderItems, { productId: products[0].id, quantity: 1, unitPrice: products[0].price }]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...orderItems];
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      updated[index] = { ...updated[index], productId: value as string, unitPrice: product?.price ?? 0 };
    } else if (field === 'quantity') {
      updated[index] = { ...updated[index], quantity: Number(value) };
    } else if (field === 'notes') {
      updated[index] = { ...updated[index], notes: value as string };
    }
    setOrderItems(updated);
  };

  const handleCreateOrder = async () => {
    if (!selectedSession || orderItems.length === 0) {
      toast.error('Selecione uma sessão e adicione itens');
      return;
    }
    try {
      await ordersService.create({
        tableSessionId: selectedSession,
        notes: orderNotes || undefined,
        items: orderItems,
      });
      toast.success('Pedido criado com sucesso!');
      setShowForm(false);
      setSelectedSession('');
      setOrderNotes('');
      setOrderItems([]);
      loadData();
    } catch {
      toast.error('Erro ao criar pedido');
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await ordersService.updateStatus({ id: orderId, status: newStatus });
      toast.success('Status atualizado!');
      loadData();
    } catch {
      toast.error('Erro ao atualizar status');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📋 Pedidos</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo Pedido'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>Novo Pedido</h3>
          <div className="form-group">
            <label>Sessão da Mesa</label>
            <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
              <option value="">Selecione...</option>
              {sessions.map(s => (
                <option key={s.id} value={s.id}>Mesa {s.tableNumber} (aberta em {new Date(s.openedAt).toLocaleString('pt-BR')})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Observações</label>
            <input type="text" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Observações do pedido" />
          </div>
          <div className="order-items-form">
            <div className="items-header">
              <h4>Itens</h4>
              <button className="btn-small" onClick={handleAddItem}>+ Item</button>
            </div>
            {orderItems.map((item, index) => (
              <div key={index} className="order-item-row">
                <select value={item.productId} onChange={(e) => handleItemChange(index, 'productId', e.target.value)}>
                  {products.filter(p => p.isAvailable).map(p => (
                    <option key={p.id} value={p.id}>{p.name} - R$ {p.price.toFixed(2)}</option>
                  ))}
                </select>
                <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} style={{ width: '70px' }} />
                <input type="text" placeholder="Obs" value={item.notes ?? ''} onChange={(e) => handleItemChange(index, 'notes', e.target.value)} style={{ width: '120px' }} />
                <span>R$ {(item.unitPrice * item.quantity).toFixed(2)}</span>
                <button className="btn-danger-small" onClick={() => handleRemoveItem(index)}>✕</button>
              </div>
            ))}
            {orderItems.length > 0 && (
              <div className="order-total">
                <strong>Total: R$ {orderItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0).toFixed(2)}</strong>
              </div>
            )}
          </div>
          <button className="btn-primary" onClick={handleCreateOrder}>Criar Pedido</button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">Nenhum pedido encontrado</div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="card order-card">
              <div className="order-header" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                <div className="order-info">
                  <span className="order-table">Mesa {order.tableNumber}</span>
                  <span className="badge" style={{ backgroundColor: statusColors[order.status] }}>
                    {OrderStatusLabels[order.status]}
                  </span>
                </div>
                <div className="order-meta">
                  <span className="order-amount">R$ {order.totalAmount.toFixed(2)}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
              {order.waiterName && <p className="order-waiter">Garçom: {order.waiterName}</p>}
              {order.notes && <p className="order-notes">📝 {order.notes}</p>}
              <div className="order-actions">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, Number(e.target.value) as OrderStatus)}
                >
                  {Object.entries(OrderStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {expandedOrder === order.id && (
                <div className="order-items">
                  <h4>Itens do Pedido</h4>
                  <table>
                    <thead>
                      <tr><th>Produto</th><th>Qtd</th><th>Preço Unit.</th><th>Total</th><th>Obs</th></tr>
                    </thead>
                    <tbody>
                      {order.items.map(item => (
                        <tr key={item.id}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>R$ {item.unitPrice.toFixed(2)}</td>
                          <td>R$ {(item.unitPrice * item.quantity).toFixed(2)}</td>
                          <td>{item.notes ?? '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
