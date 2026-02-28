import { useState, useEffect } from 'react';
import { tenantsService } from '../services/tenantsService';
import { PlanType } from '../types';
import type { TenantDto } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

const planLabels: Record<PlanType, string> = {
  [PlanType.Basic]: 'Básico',
  [PlanType.Pro]: 'Pro',
  [PlanType.Enterprise]: 'Enterprise',
};

export default function TenantsPage() {
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await tenantsService.getAll();
      setTenants(data);
    } catch {
      toast.error('Erro ao carregar restaurantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleToggle = async (id: string) => {
    try {
      await tenantsService.toggle(id);
      toast.success('Status alterado!');
      loadData();
    } catch {
      toast.error('Erro ao alterar status');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🏢 Restaurantes</h1>
      </div>

      {tenants.length === 0 ? (
        <div className="empty-state">Nenhum restaurante encontrado</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Plano</th>
                <th>Status</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id}>
                  <td><strong>{tenant.name}</strong></td>
                  <td>{tenant.cnpj}</td>
                  <td>{planLabels[tenant.plan]}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: tenant.isActive ? '#2ecc71' : '#e74c3c' }}>
                      {tenant.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>{new Date(tenant.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button className="btn-small" onClick={() => handleToggle(tenant.id)}>
                      {tenant.isActive ? '⏸️ Desativar' : '▶️ Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
