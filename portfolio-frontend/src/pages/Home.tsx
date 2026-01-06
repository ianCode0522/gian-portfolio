import { useState, useEffect } from 'react';
import { getUpdates, getSkills, getCertificates } from '../services/api';
import { Update, Certificate } from '../types';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiChevronDown,
  FiX
} from 'react-icons/fi';

import '../styles/Home.css';

const Home = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [updatesData, certificatesData] = await Promise.all([
        getUpdates(),
        getCertificates()
      ]);
      setUpdates(updatesData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
            <section className="hero-section-new min-vh-100 d-flex align-items-center position-relative">
            {/* Background blur effects */}
            <div className="blur-circle-1 blur-1"></div>
            <div className="blur-circle-1 blur-2"></div>
            <div className="blur-circle-1 blur-3"></div>
            <div className="blur-circle-2 blur-4"></div>
            <div className="blur-circle-2 blur-5"></div>
            <div className="blur-circle-3 blur-6"></div>
            <div className="blur-circle-4 blur-7"></div>
            <div className="blur-circle-4 blur-8"></div>
            
            <div className="container position-relative">
                <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0 ps-lg-5">
                    <div className="hero-text">
                    <p className="hero-greeting text-primary fw-semibold mb-2">Hello I'm</p>
                    <h1 className="hero-name display-2 fw-bold mb-3">
                        GIAN XAVIER<br/>AQUINO
                    </h1>
                    <p className="hero-subtitle fs-6 mb-4 text-muted">
                        Software Developer | Front-End Development & Quality Assurance Specialist
                    </p>
                    <a href="/cv/GianXavierTabernillaAquino_CV.pdf" download className="btn btn-primary">
                        Get CV
                    </a>
                    </div>
                </div>
                
                <div className="col-lg-6">
                    <div className="hero-image-container position-relative">
                    <div className="profile-border"></div>
                    <p>Photo coming soon...</p>
                    {/* <img 
                        // src="images/profile-photo.png" 
                        alt="Gian Xavier Aquino" 
                        className="profile-photo img-fluid"
                    /> */}
                    </div>
                </div>
                </div>
            </div>
            </section>

        {/* About Section */}
        <section id="about" className="about-section-new py-5">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
                <p className="section-label text-primary fw-semibold mb-2">About Me</p>
                <h2 className="about-title display-4 fw-bold mb-4">
                Aspiring Software Developer
                </h2>
                <p className="about-description fs-6 text-muted">
                An aspiring software developer specializing in front-end development and quality 
                assurance, creating responsive web and mobile applications witha strong focus on 
                simplicity and usability.
                </p>
            </div>
            
            <div className="col-lg-6">
                <div className="tech-logos-container position-relative">
                <img src="/tech-logos/flutter.png" alt="Flutter" className="tech-logo tech-logo-1" />
                <img src="/tech-logos/css3.png" alt="CSS3" className="tech-logo tech-logo-2" />
                <img src="/tech-logos/html5.png" alt="HTML5" className="tech-logo tech-logo-3" />
                <img src="/tech-logos/javascript.png" alt="JavaScript" className="tech-logo tech-logo-4" />
                <img src="/tech-logos/react.png" alt="React" className="tech-logo tech-logo-5" />
                <img src="/tech-logos/php.png" alt="PHP" className="tech-logo tech-logo-6" />
                </div>
            </div>
            </div>
            
            {/* Stats Section */}
           
            <div className="row text-center mt-5">
                <div className="col-md-4 mb-4 mb-md-0">
                <div className="stat-item">
                    <h3 className="stat-number display-3 fw-bold text-primary mb-2">3+</h3>
                    <p className="stat-label fs-5 text-dark fw-semibold">Years Learning</p>
                </div>
                </div>
                
                <div className="col-md-4 mb-4 mb-md-0 position-relative">
                <div className="stat-divider start"></div>
                <div className="stat-item">
                    <h3 className="stat-number display-3 fw-bold text-primary mb-2">3</h3>
                    <p className="stat-label fs-5 text-dark fw-semibold">Project Delivered</p>
                </div>
                <div className="stat-divider end"></div>
                </div>
                
                <div className="col-md-4">
                <div className="stat-item">
                    <h3 className="stat-number display-3 fw-bold text-primary mb-2">5+</h3>
                    <p className="stat-label fs-5 text-dark fw-semibold">Certifications</p>
                </div>
                </div>
            </div>
            </div>
       
        </section>

    

      {/* Certificates Section */}
      <section id="certificates" className="certificates-section position-relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="cert-blur cert-blur-1"></div>
        <div className="cert-blur cert-blur-2"></div>
        <div className="cert-blur cert-blur-3"></div>
        
        <div className="container position-relative">
          <div className="row align-items-start">
            {/* Left side - Title and description */}
            <div className="col-lg-4 mb-5 mb-lg-0 sticky-top" style={{ top: '100px' }}>
              <p className="section-label text-primary fw-semibold mb-2">My Achievements</p>
              <h2 className="section-title display-4 fw-bold mb-4">Certifications</h2>
              <p className="text-muted mb-4">
                Continuously learning and growing through professional certifications and courses.
              </p>
              <div className="cert-stats d-flex gap-4">
                <div>
                  <h3 className="text-primary fw-bold mb-0">{certificates.length}</h3>
                  <small className="text-muted">Certificates</small>
                </div>
                <div>
                  <h3 className="text-primary fw-bold mb-0">
                    {new Set(certificates.map(cert => cert.issuer)).size}
                  </h3>
                  <small className="text-muted">Platforms</small>
                </div>
              </div>
            </div>
            
            {/* Right side - Certificate cards */}
            <div className="col-lg-8">
              {certificates.length === 0 ? (
                <p className="text-muted">No certificates available yet.</p>
              ) : (
                <div className="row g-4">
                  {certificates.map((cert, index) => (
                    <div key={cert.id} className="col-md-6">
                      <div 
                        className="certificate-card"
                        onClick={() => setSelectedCertificate(cert)}
                      >
                        <div className="cert-image-wrapper">
                          <img 
                            src={`http://127.0.0.1:8000${cert.image_path}`}
                            alt={cert.certificate_name}
                            className="cert-image"
                          />
                          <div className="cert-overlay">
                            <span className="view-btn">View Details</span>
                          </div>
                        </div>
                        <div className="cert-content">
                          <span className="cert-issuer">{cert.issuer}</span>
                          <h5 className="cert-title">{cert.certificate_name}</h5>
                          <div className="cert-date">
                            {new Date(cert.issue_date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Updates Section */}
      <section id="portfolio" className="portfolio-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h2 className="display-5 fw-bold text-center mb-5">Portfolio Updates</h2>
              
              {updates.length === 0 ? (
                <p className="text-center text-muted">No updates available yet.</p>
              ) : (
                <div className="row g-4">
                  {updates.map((update) => (
                    <div key={update.id} className="col-md-6 col-lg-4">
                      <div className="update-card card h-100 shadow-sm">
                        {update.image_url && (
                          <img 
                            src={update.image_url} 
                            className="card-img-top" 
                            alt={update.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        )}
                        <div className="card-body">
                          {update.category && (
                            <span className="badge bg-primary mb-2">{update.category}</span>
                          )}
                          <h5 className="card-title">{update.title}</h5>
                          <p className="card-text">{update.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {new Date(update.created_at).toLocaleDateString()}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Get In Touch</h2>
              <p className="lead mb-5">Let's work together on your next project</p>
              
              <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
                <a href="mailto:gian.aquino@example.com" className="btn btn-outline-light btn-lg">
                  <FiMail className="me-2" />
                  Email
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">
                  <FiGithub className="me-2" />
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">
                  <FiLinkedin className="me-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
            className="cert-modal-overlay"
            onClick={() => setSelectedCertificate(null)}
        >
            <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="cert-modal-close"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <FiX size={24} />
                </button>
                
                <div className="cert-modal-content">
                    <div className="cert-modal-image">
                        <img 
                            src={`http://127.0.0.1:8000${selectedCertificate.image_path}`}
                            alt={selectedCertificate.certificate_name}
                        />
                    </div>
                    
                    <div className="cert-modal-details">
                        <span className="cert-modal-issuer">{selectedCertificate.issuer}</span>
                        <h2 className="cert-modal-title">{selectedCertificate.certificate_name}</h2>
                        
                        <div className="cert-modal-info">
                            <div className="cert-info-item">
                                <span className="cert-info-label">Recipient</span>
                                <span className="cert-info-value">{selectedCertificate.full_name}</span>
                            </div>
                            <div className="cert-info-item">
                                <span className="cert-info-label">Issue Date</span>
                                <span className="cert-info-value">
                                    {new Date(selectedCertificate.issue_date).toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </span>
                            </div>
                            {selectedCertificate.certificate_number && (
                                <div className="cert-info-item">
                                    <span className="cert-info-label">Certificate ID</span>
                                    <span className="cert-info-value">{selectedCertificate.certificate_number}</span>
                                </div>
                            )}
                            {selectedCertificate.score && (
                                <div className="cert-info-item">
                                    <span className="cert-info-label">Score</span>
                                    <span className="cert-info-value cert-score">{selectedCertificate.score}</span>
                                </div>
                            )}
                        </div>
                        
                        {selectedCertificate.skills_covered && (
                            <div className="cert-skills">
                                <span className="cert-info-label">Skills Covered</span>
                                <div className="cert-skills-tags">
                                    {selectedCertificate.skills_covered.split(',').map((skill, i) => (
                                        <span key={i} className="cert-skill-tag">{skill.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {selectedCertificate.description && (
                            <div className="cert-description">
                                <span className="cert-info-label">Description</span>
                                <p>{selectedCertificate.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Home;