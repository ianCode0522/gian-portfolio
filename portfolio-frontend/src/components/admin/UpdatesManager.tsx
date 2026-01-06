import { useState, useEffect } from 'react';
import { 
  getAdminUpdates, 
  createUpdate, 
  updateUpdate, 
  deleteUpdate 
} from '../../services/api';
import { Update } from '../../types';
import { FiEdit, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

const UpdatesManager = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    published: true,
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const data = await getAdminUpdates();
      setUpdates(data);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateUpdate(editing, formData);
      } else {
        await createUpdate(formData);
      }
      resetForm();
      fetchUpdates();
    } catch (error) {
      console.error('Error saving update:', error);
    }
  };

  const handleEdit = (update: Update) => {
    setEditing(update.id);
    setFormData({
      title: update.title,
      description: update.description,
      category: update.category || '',
      image_url: update.image_url || '',
      published: update.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await deleteUpdate(id);
        fetchUpdates();
      } catch (error) {
        console.error('Error deleting update:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image_url: '',
      published: true,
    });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="manager-container">
      <div className="manager-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Portfolio Updates Manager</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <FiX className="me-2" /> : <FiPlus className="me-2" />}
          {showForm ? 'Cancel' : 'Add Update'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-section">
          <h4 className="mb-3">{editing ? 'Edit Update' : 'Create New Update'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Web Development, Mobile App"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="published">
                Published (visible on public site)
              </label>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                <FiSave className="me-2" />
                {editing ? 'Update' : 'Create'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Updates List */}
      <div className="mt-4">
        <h4 className="mb-3">All Updates ({updates.length})</h4>
        {updates.length === 0 ? (
          <div className="alert alert-info">
            No updates yet. Create your first update to get started.
          </div>
        ) : (
          <div className="row">
            {updates.map((update) => (
              <div key={update.id} className="col-md-6 col-lg-4 mb-3">
                <div className="item-card">
                  {update.image_url && (
                    <img 
                      src={update.image_url} 
                      alt={update.title}
                      className="img-fluid rounded mb-3"
                      style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0">{update.title}</h5>
                    <span className={`badge ${update.published ? 'bg-success' : 'bg-secondary'}`}>
                      {update.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {update.category && (
                    <span className="badge bg-primary mb-2">{update.category}</span>
                  )}
                  <p className="text-muted mb-3">{update.description}</p>
                  <small className="text-muted d-block mb-3">
                    {new Date(update.created_at).toLocaleDateString()}
                  </small>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(update)}
                    >
                      <FiEdit className="me-1" />
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(update.id)}
                    >
                      <FiTrash2 className="me-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatesManager;