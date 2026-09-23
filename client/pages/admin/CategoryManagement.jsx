import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../src/api/categories.api';
import AdminPanel from '../../src/components/admin/AdminPanel';
import AdminTable from '../../src/components/admin/AdminTable';

const emptyForm = { name: '', slug: '', description: '' };
const slugify = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  const load = () => getCategories().then((data) => setCategories(data.categories || [])).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const save = async (event) => {
    event.preventDefault();
    setError('');
    const payload = { ...form, slug: slugify(form.slug || form.name) };
    try {
      if (form._id) await updateCategory(form._id, payload);
      else await createCategory(payload);
      setForm(null);
      load();
    } catch (err) { setError(err.message); }
  };

  const remove = async (category) => {
    if (!window.confirm(`Delete category “${category.name}”?`)) return;
    setError('');
    try { await deleteCategory(category._id); load(); } catch (err) { setError(err.message); }
  };

  return (
    <div className="admin-page">
      <AdminPanel title="Category Management" action={<button className="primary-btn" onClick={() => setForm(emptyForm)}>Add category</button>}>
        {error && <p className="form-error">{error}</p>}
        <AdminTable columns={['Name', 'Slug', 'Description', '']}>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td><td>{category.slug}</td><td>{category.description || '—'}</td>
              <td><button className="link-btn" onClick={() => setForm(category)}>Edit</button><button className="link-btn danger" onClick={() => remove(category)}>Delete</button></td>
            </tr>
          ))}
        </AdminTable>
      </AdminPanel>
      {form && <div className="modal"><form className="product-form" onSubmit={save}>
        <button type="button" className="close" onClick={() => setForm(null)}>×</button>
        <h2>{form._id ? 'Edit category' : 'Add category'}</h2>
        <input required placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form._id ? form.slug : slugify(e.target.value) })} />
        <input required placeholder="Slug (for example: pop-culture)" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        <textarea placeholder="Description (optional)" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="primary-btn">Save category</button>
      </form></div>}
    </div>
  );
}
