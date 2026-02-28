import { useState, useEffect } from 'react';
import { productsService } from '../services/productsService';
import { categoriesService } from '../services/categoriesService';
import type { ProductDto, CategoryDto, CreateProductCommand } from '../types';
import toast from 'react-hot-toast';
import './OrdersPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
  const [form, setForm] = useState<CreateProductCommand>({ categoryId: '', name: '', price: 0 });

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsService.getAll(),
        categoriesService.getAll().catch(() => []),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const resetForm = () => {
    setForm({ categoryId: categories[0]?.id ?? '', name: '', price: 0 });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: ProductDto) => {
    setEditingProduct(product);
    setForm({
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.categoryId || form.price <= 0) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    try {
      if (editingProduct) {
        await productsService.update({ id: editingProduct.id, ...form });
        toast.success('Produto atualizado!');
      } else {
        await productsService.create(form);
        toast.success('Produto criado!');
      }
      resetForm();
      loadData();
    } catch {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await productsService.toggleAvailability(id);
      toast.success('Disponibilidade alterada!');
      loadData();
    } catch {
      toast.error('Erro ao alterar disponibilidade');
    }
  };

  if (loading) return <div className="page-loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🛒 Produtos</h1>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}>
          {showForm ? 'Cancelar' : '+ Novo Produto'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
          <div className="form-group">
            <label>Nome *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do produto" />
          </div>
          <div className="form-group">
            <label>Categoria *</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Selecione...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Preço *</label>
            <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição" />
          </div>
          <div className="form-group">
            <label>URL da Imagem</label>
            <input type="text" value={form.imageUrl ?? ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
          </div>
          <button className="btn-primary" onClick={handleSubmit}>{editingProduct ? 'Atualizar' : 'Criar'}</button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="empty-state">Nenhum produto encontrado</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Disponível</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-name">
                      {product.imageUrl && <img src={product.imageUrl} alt="" className="product-thumb" />}
                      <div>
                        <strong>{product.name}</strong>
                        {product.description && <small className="text-muted">{product.description}</small>}
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>
                    <button
                      className={`btn-toggle ${product.isAvailable ? 'active' : ''}`}
                      onClick={() => handleToggle(product.id)}
                    >
                      {product.isAvailable ? '✅' : '❌'}
                    </button>
                  </td>
                  <td>
                    <button className="btn-small" onClick={() => handleEdit(product)}>✏️ Editar</button>
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
