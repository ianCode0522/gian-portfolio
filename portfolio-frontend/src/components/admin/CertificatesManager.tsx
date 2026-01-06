import { useState, useEffect } from 'react';
import { 
  getAdminCertificates, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate 
} from '../../services/api';
import { Certificate } from '../../types';
import { FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiUpload } from 'react-icons/fi';

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    certificate_name: '',
    full_name: '',
    issuer: '',
    issue_date: '',
    certificate_number: '',
    score: '',
    skills_covered: '',
    description: '',
    is_visible: true,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await getAdminCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'is_visible') {
        // Convert boolean to "1" or "0" for Laravel
        submitData.append(key, (formData as any)[key] ? '1' : '0');
      } else {
        submitData.append(key, (formData as any)[key]);
      }
    });
    
    if (imageFile) {
      submitData.append('certificate_image', imageFile);
    }

    try {
      if (editing) {
        await updateCertificate(editing, submitData);
      } else {
        await createCertificate(submitData);
      }
      resetForm();
      fetchCertificates();
    } catch (error: any) {
      console.error('Error saving certificate:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Unknown error';
      alert(`Error saving certificate: ${errorMessage}`);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditing(cert.id);
    setFormData({
      certificate_name: cert.certificate_name,
      full_name: cert.full_name,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      certificate_number: cert.certificate_number || '',
      score: cert.score || '',
      skills_covered: cert.skills_covered || '',
      description: cert.description || '',
      is_visible: cert.is_visible,
    });
    setImagePreview(cert.image_path);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        fetchCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      certificate_name: '',
      full_name: '',
      issuer: '',
      issue_date: '',
      certificate_number: '',
      score: '',
      skills_covered: '',
      description: '',
      is_visible: true,
    });
    setImageFile(null);
    setImagePreview('');
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
        <h2 className="mb-0">Certificates Manager</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <FiX className="me-2" /> : <FiPlus className="me-2" />}
          {showForm ? 'Cancel' : 'Add Certificate'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-section">
          <h4 className="mb-3">{editing ? 'Edit Certificate' : 'Add New Certificate'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Certificate Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.certificate_name}
                  onChange={(e) => setFormData({ ...formData, certificate_name: e.target.value })}
                  required
                  placeholder="e.g., TOPCIT Level 3"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name/Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                  placeholder="Complete certificate title"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Issuer *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  required
                  placeholder="e.g., Korea IITP, Simplilearn"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Issue Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Certificate Image *</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required={!editing}
              />
              <small className="text-muted">Max size: 5MB. Formats: JPG, PNG, GIF</small>
              
              {imagePreview && (
                <div className="mt-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Certificate Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.certificate_number}
                  onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })}
                  placeholder="Optional certificate ID"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Score</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="e.g., 95%, Level 3"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Skills Covered</label>
              <input
                type="text"
                className="form-control"
                value={formData.skills_covered}
                onChange={(e) => setFormData({ ...formData, skills_covered: e.target.value })}
                placeholder="Comma-separated: React, TypeScript, Node.js"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details about the certificate"
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="certVisible"
                checked={formData.is_visible}
                onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="certVisible">
                Visible (show on public site)
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

      {/* Certificates List */}
      <div className="mt-4">
        <h4 className="mb-3">All Certificates ({certificates.length})</h4>
        {certificates.length === 0 ? (
          <div className="alert alert-info">
            No certificates yet. Add your first certificate to get started.
          </div>
        ) : (
          <div className="row">
            {certificates.map((cert) => (
              <div key={cert.id} className="col-md-6 col-lg-4 mb-3">
                <div className="item-card">
                  <img 
                    src={`http://127.0.0.1:8000${cert.image_path}`}
                    alt={cert.certificate_name}
                    className="img-fluid rounded mb-3"
                    style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">{cert.certificate_name}</h6>
                    <span className={`badge ${cert.is_visible ? 'bg-success' : 'bg-secondary'}`}>
                      {cert.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-muted mb-1"><small>{cert.issuer}</small></p>
                  <p className="text-muted mb-2">
                    <small>
                      {new Date(cert.issue_date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </small>
                  </p>
                  {cert.score && (
                    <p className="mb-2"><small>Score: {cert.score}</small></p>
                  )}
                  <div className="d-flex gap-2 mt-3">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(cert)}
                    >
                      <FiEdit className="me-1" />
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(cert.id)}
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

export default CertificatesManager;