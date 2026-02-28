import { useState, useEffect } from 'react';
import { categoriesService } from '../services/categoriesService';
import type { CategoryDto, CreateCategoryCommand } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [form, setForm] = useState<CreateCategoryCommand>({ name: '' });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch {
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const resetForm = () => {
    setForm({ name: '' });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleEdit = (category: CategoryDto) => {
    setEditingCategory(category);
    setForm({ name: category.name, description: category.description, sortOrder: category.sortOrder });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name) {
      toast.error('Informe o nome da categoria');
      return;
    }
    try {
      if (editingCategory) {
        await categoriesService.update({ id: editingCategory.id, ...form });
        toast.success('Categoria atualizada!');
      } else {
        await categoriesService.create(form);
        toast.success('Categoria criada!');
      }
      resetForm();
      loadData();
    } catch {
      toast.error('Erro ao salvar categoria');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
    try {
      await categoriesService.delete(id);
      toast.success('Categoria excluída!');
      loadData();
    } catch {
      toast.error('Erro ao excluir categoria');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📂 Categorias</h1>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}>
          {showForm ? 'Cancelar' : '+ Nova Categoria'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h3>
          <div className="form-group">
            <label>Nome *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome da categoria" />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição" />
          </div>
          <div className="form-group">
            <label>Ordem</label>
            <input type="number" value={form.sortOrder ?? 0} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </div>
          <button className="btn-primary" onClick={handleSubmit}>{editingCategory ? 'Atualizar' : 'Criar'}</button>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="empty-state">Nenhuma categoria encontrada</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ordem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td><strong>{cat.name}</strong></td>
                  <td>{cat.description ?? '-'}</td>
                  <td>{cat.sortOrder}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-small" onClick={() => handleEdit(cat)}>✏️ Editar</button>
                      <button className="btn-danger-small" onClick={() => handleDelete(cat.id)}>🗑️ Excluir</button>
                    </div>
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
