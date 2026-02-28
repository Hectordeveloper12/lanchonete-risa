import { useState, useEffect, useCallback } from 'react';
import { ordersService } from '../services/ordersService';
import { OrderStatus, OrderStatusLabels } from '../types';
import type { OrderDto } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Received]: '#3498db',
  [OrderStatus.InPreparation]: '#f39c12',
  [OrderStatus.Ready]: '#2ecc71',
  [OrderStatus.Delivered]: '#27ae60',
  [OrderStatus.Cancelled]: '#e74c3c',
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await ordersService.getKitchenOrders();
      setOrders(data);
    } catch {
      toast.error('Erro ao carregar pedidos da cozinha');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

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
        <h1>🍳 Cozinha</h1>
        <button className="btn-small" onClick={loadData}>🔄 Atualizar</button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">Nenhum pedido pendente</div>
      ) : (
        <div className="kitchen-grid">
          {orders.map(order => (
            <div key={order.id} className="kitchen-card" style={{ borderLeftColor: statusColors[order.status] }}>
              <div className="kitchen-header">
                <strong>Mesa {order.tableNumber}</strong>
                <span className="badge" style={{ backgroundColor: statusColors[order.status] }}>
                  {OrderStatusLabels[order.status]}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem' }}>
                {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
              </div>
              {order.notes && <p style={{ fontSize: '0.85rem', color: '#e67e22', margin: '0 0 0.5rem' }}>📝 {order.notes}</p>}
              <ul className="kitchen-items">
                {order.items.map(item => (
                  <li key={item.id}>
                    <strong>{item.quantity}x</strong> {item.productName}
                    {item.notes && <span style={{ color: '#999' }}> ({item.notes})</span>}
                  </li>
                ))}
              </ul>
              <div className="kitchen-actions">
                {order.status === OrderStatus.Received && (
                  <button className="btn-warning" onClick={() => handleStatusChange(order.id, OrderStatus.InPreparation)}>
                    🔥 Preparar
                  </button>
                )}
                {order.status === OrderStatus.InPreparation && (
                  <button className="btn-success" onClick={() => handleStatusChange(order.id, OrderStatus.Ready)}>
                    ✅ Pronto
                  </button>
                )}
                {order.status === OrderStatus.Ready && (
                  <button className="btn-primary" onClick={() => handleStatusChange(order.id, OrderStatus.Delivered)}>
                    🍽️ Entregue
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
