import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { DashboardDto } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await dashboardService.get();
        setData(result);
      } catch {
        toast.error('Erro ao carregar dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="page-loading">Carregando...</div>;
  if (!data) return <div className="empty-state">Erro ao carregar dados</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Dashboard</h1>
      </div>

      <div className="grid-cards">
        <div className="stat-card">
          <span className="stat-label">🏢 Restaurantes</span>
          <span className="stat-value">{data.totalRestaurants}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">📋 Total de Pedidos</span>
          <span className="stat-value">{data.totalOrders}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">💰 Receita Total</span>
          <span className="stat-value">R$ {data.totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {data.ordersByRestaurant.length > 0 && (
        <>
          <h2 style={{ marginTop: '2rem', color: '#1a1a2e' }}>Pedidos por Restaurante</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Restaurante</th>
                  <th>Pedidos</th>
                  <th>Receita</th>
                </tr>
              </thead>
              <tbody>
                {data.ordersByRestaurant.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.restaurantName}</strong></td>
                    <td>{r.totalOrders}</td>
                    <td style={{ color: '#27ae60', fontWeight: 600 }}>R$ {r.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
