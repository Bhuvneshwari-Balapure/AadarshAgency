import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiUser, FiPhone, FiMail, FiMapPin, FiPlus, FiTrash2, FiDownload, FiUpload } from 'react-icons/fi';
import { FaBusinessTime, FaIdCardAlt, FaUsers, FaHeartbeat, FaMoneyBillWave, FaTasks, FaBullseye } from 'react-icons/fa';

const CustomerDetail = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [checklists, setChecklists] = useState([{ name: '', file: null }]);
  const [textChecklists, setTextChecklists] = useState(['']);

  // Sample user data
  const userData = {
    name: "Mr. Abdul Amir Khan",
    groupCode: "1AR001",
    grade: "Grade A",
    occupation: "Business (CA)",
    phone: "8656027931",
    email: "Operations.acecomm@gmail.com",
    currentAddress: "Sajida Nagar Karbala Road Bhopal 462001",
    permanentAddress: "Sajida Nagar Karbala Road Bhopal 462001",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "15 Jan 2020",
    lastContact: "2 days ago",
    status: "Active",
    reference: "Mr. Sharma (ID: REF1002)"
  };

  // Add new checklist item
  const addChecklist = () => {
    setChecklists([...checklists, { name: '', file: null }]);
  };

  // Remove checklist item
  const removeChecklist = (index) => {
    const newChecklists = [...checklists];
    newChecklists.splice(index, 1);
    setChecklists(newChecklists);
  };

  // Handle checklist name change
  const handleChecklistChange = (index, e) => {
    const newChecklists = [...checklists];
    newChecklists[index].name = e.target.value;
    setChecklists(newChecklists);
  };

  // Handle file change
  const handleFileChange = (index, e) => {
    const newChecklists = [...checklists];
    newChecklists[index].file = e.target.files[0];
    setChecklists(newChecklists);
  };

  // Add new text checklist
  const addTextChecklist = () => {
    setTextChecklists([...textChecklists, '']);
  };

  // Handle text checklist change
  const handleTextChecklistChange = (index, e) => {
    const newChecklists = [...textChecklists];
    newChecklists[index] = e.target.value;
    setTextChecklists(newChecklists);
  };

  return (
    <div className="customer-profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <h1>Customer Profile</h1>
        <div className="status-badge">
          <span className={`status-dot ${userData.status.toLowerCase()}`}></span>
          {userData.status}
        </div>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image-container">
            <img src={userData.image} alt="User profile" className="profile-image" />
            <div className="profile-actions">
              <button className="btn-icon">
                <FiUpload size={16} />
              </button>
              <button className="btn-icon">
                <FiDownload size={16} />
              </button>
            </div>
          </div>

          <div className="profile-info">
            <h2 className="profile-name">{userData.name}</h2>
            <div className="profile-meta">
              <span className="badge">{userData.groupCode}</span>
              <span className="badge secondary">{userData.grade}</span>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <FiUser className="detail-icon" />
                <div>
                  <p className="detail-label">Occupation</p>
                  <p className="detail-value">{userData.occupation}</p>
                </div>
              </div>
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <div>
                  <p className="detail-label">Phone</p>
                  <p className="detail-value">{userData.phone}</p>
                </div>
              </div>
              <div className="detail-item">
                <FiMail className="detail-icon" />
                <div>
                  <p className="detail-label">Email</p>
                  <p className="detail-value">{userData.email}</p>
                </div>
              </div>
              <div className="detail-item">
                <FiMapPin className="detail-icon" />
                <div>
                  <p className="detail-label">Location</p>
                  <p className="detail-value">Bhopal, India</p>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <p className="stat-value">3</p>
                <p className="stat-label">Family Members</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">5</p>
                <p className="stat-label">Active Policies</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">12</p>
                <p className="stat-label">Total Interactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="content-area">
          {/* Quick Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">
                <FiUser size={24} />
              </div>
              <div>
                <h3>Member Since</h3>
                <p>{userData.joinDate}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <FiPhone size={24} />
              </div>
              <div>
                <h3>Last Contact</h3>
                <p>{userData.lastContact}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <FaIdCardAlt size={24} />
              </div>
              <div>
                <h3>Referred By</h3>
                <p>{userData.reference}</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="tabs-container">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
              <TabList className="custom-tablist">
                <Tab className={`custom-tab ${tabIndex === 0 ? 'active' : ''}`}>
                  <FaIdCardAlt className="tab-icon" />
                  <span>Referred By</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 1 ? 'active' : ''}`}>
                  <FiUser className="tab-icon" />
                  <span>Personal Details</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 2 ? 'active' : ''}`}>
                  <FaUsers className="tab-icon" />
                  <span>Family Members</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 3 ? 'active' : ''}`}>
                  <FaHeartbeat className="tab-icon" />
                  <span>Health History</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 4 ? 'active' : ''}`}>
                  <FaMoneyBillWave className="tab-icon" />
                  <span>Financial Details</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 5 ? 'active' : ''}`}>
                  <FaTasks className="tab-icon" />
                  <span>Task Details</span>
                </Tab>
                <Tab className={`custom-tab ${tabIndex === 6 ? 'active' : ''}`}>
                  <FaBullseye className="tab-icon" />
                  <span>Future Priorities</span>
                </Tab>
              </TabList>

              {/* Tab Panels */}
              <TabPanel>
                <div className="tab-content">
                  <h3>Referral Information</h3>
                  <div className="referral-form">
                    {textChecklists.map((checklist, index) => (
                      <div key={index} className="form-group">
                        <label>Reference {index + 1}</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={checklist}
                            onChange={(e) => handleTextChecklistChange(index, e)}
                            placeholder="Enter reference details"
                          />
                          {index > 0 && (
                            <button
                              className="btn-danger"
                              onClick={() => {
                                const newChecklists = [...textChecklists];
                                newChecklists.splice(index, 1);
                                setTextChecklists(newChecklists);
                              }}
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button className="btn-secondary" onClick={addTextChecklist}>
                      <FiPlus /> Add Reference
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Personal Documents</h3>
                  <div className="document-form">
                    {checklists.map((item, index) => (
                      <div key={index} className="document-item">
                        <div className="form-group">
                          <label>Document Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={item.name}
                            onChange={(e) => handleChecklistChange(index, e)}
                            placeholder="e.g. Aadhar Card, Passport"
                          />
                        </div>
                        <div className="form-group">
                          <label>Upload Document</label>
                          <div className="file-upload">
                            <label className="btn-outline">
                              <FiUpload className="icon-left" />
                              Choose File
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(index, e)}
                                hidden
                              />
                            </label>
                            <span className="file-name">
                              {item.file ? item.file.name : 'No file chosen'}
                            </span>
                          </div>
                        </div>
                        {index > 0 && (
                          <button
                            className="btn-danger remove-btn"
                            onClick={() => removeChecklist(index)}
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="btn-secondary" onClick={addChecklist}>
                      <FiPlus /> Add Document
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Family Members</h3>
                  <div className="family-grid">
                    {/* Sample family member cards */}
                    <div className="family-card">
                      <div className="family-avatar">S</div>
                      <div className="family-info">
                        <h4>Mrs. Salma Khan</h4>
                        <p>Wife • 42 years</p>
                        <span className="badge">Dependent</span>
                      </div>
                    </div>
                    <div className="family-card">
                      <div className="family-avatar">A</div>
                      <div className="family-info">
                        <h4>Arif Khan</h4>
                        <p>Son • 18 years</p>
                        <span className="badge">Student</span>
                      </div>
                    </div>
                    <div className="family-card">
                      <div className="family-avatar">F</div>
                      <div className="family-info">
                        <h4>Fatima Khan</h4>
                        <p>Daughter • 15 years</p>
                        <span className="badge">Student</span>
                      </div>
                    </div>
                    <button className="add-family-btn">
                      <FiPlus size={24} />
                      Add Family Member
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Health Records</h3>
                  <div className="health-timeline">
                    <div className="timeline-item">
                      <div className="timeline-date">15 Mar 2023</div>
                      <div className="timeline-content">
                        <h4>Annual Health Checkup</h4>
                        <p>Completed full body checkup at Apollo Hospital. All parameters normal.</p>
                        <div className="timeline-actions">
                          <button className="btn-outline">View Report</button>
                          <button className="btn-outline">Download</button>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">22 Jan 2023</div>
                      <div className="timeline-content">
                        <h4>Dental Checkup</h4>
                        <p>Routine dental cleaning. No cavities detected.</p>
                        <div className="timeline-actions">
                          <button className="btn-outline">View Report</button>
                          <button className="btn-outline">Download</button>
                        </div>
                      </div>
                    </div>
                    <button className="btn-secondary">
                      <FiPlus /> Add Health Record
                    </button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Financial Overview</h3>
                  <div className="financial-cards">
                    <div className="financial-card primary">
                      <h4>Total Investments</h4>
                      <p className="amount">₹1,85,000</p>
                      <p className="meta">Across 5 policies</p>
                    </div>
                    <div className="financial-card success">
                      <h4>Annual Premium</h4>
                      <p className="amount">₹42,500</p>
                      <p className="meta">Next due: 15 Aug 2023</p>
                    </div>
                    <div className="financial-card warning">
                      <h4>Maturity Value</h4>
                      <p className="amount">₹3,20,000</p>
                      <p className="meta">Projected in 2027</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Financial Notes</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter any additional financial details..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Tasks & Follow-ups</h3>
                  <div className="task-list">
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task1" />
                      </div>
                      <div className="task-content">
                        <label htmlFor="task1">Policy renewal discussion</label>
                        <p className="task-meta">Due: Tomorrow • High Priority</p>
                      </div>
                      <div className="task-actions">
                        <button className="btn-icon">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task2" checked />
                      </div>
                      <div className="task-content">
                        <label htmlFor="task2" className="completed">Submit health documents</label>
                        <p className="task-meta">Completed: 2 days ago</p>
                      </div>
                      <div className="task-actions">
                        <button className="btn-icon">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task3" />
                      </div>
                      <div className="task-content">
                        <label htmlFor="task3">Discuss new investment options</label>
                        <p className="task-meta">Due: Next week • Medium Priority</p>
                      </div>
                      <div className="task-actions">
                        <button className="btn-icon">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="add-task">
                      <input type="text" placeholder="Add new task..." />
                      <button className="btn-primary">Add</button>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="tab-content">
                  <h3>Future Goals & Priorities</h3>
                  <div className="priority-cards">
                    <div className="priority-card">
                      <div className="priority-icon">
                        <FaBusinessTime size={20} />
                      </div>
                      <div>
                        <h4>Retirement Planning</h4>
                        <p>Target: ₹50,00,000 by 2040</p>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="priority-card">
                      <div className="priority-icon">
                        <FaUsers size={20} />
                      </div>
                      <div>
                        <h4>Children's Education</h4>
                        <p>Target: ₹25,00,000 by 2030</p>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Notes on Future Plans</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter any future goals or priorities..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .customer-profile-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .profile-header h1 {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
        }

        .status-badge {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-dot.active {
          background: #28a745;
        }

        .status-dot.inactive {
          background: #6c757d;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
        }

        .profile-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .profile-image-container {
          position: relative;
          height: 200px;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-actions {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #555;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .btn-icon:hover {
          background: white;
          color: #3498db;
        }

        .profile-info {
          padding: 20px;
        }

        .profile-name {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 5px 0;
        }

        .profile-meta {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }

        .badge {
          background: #3498db;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge.secondary {
          background: #6c757d;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-icon {
          color: #7f8c8d;
          min-width: 24px;
        }

        .detail-label {
          font-size: 12px;
          color: #7f8c8d;
          margin: 0;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 500;
          margin: 2px 0 0 0;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 20px;
          text-align: center;
        }

        .stat-item {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          color: #2c3e50;
        }

        .stat-label {
          font-size: 12px;
          color: #7f8c8d;
          margin: 4px 0 0 0;
        }

        .content-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .info-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-icon {
          background: #e3f2fd;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3498db;
        }

        .info-card h3 {
          font-size: 14px;
          color: #7f8c8d;
          margin: 0 0 4px 0;
        }

        .info-card p {
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }

        .tabs-container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .custom-tablist {
          display: flex;
          background: #f8f9fa;
          padding: 0;
          margin: 0;
          list-style: none;
          border-bottom: 1px solid #eee;
        }

        .custom-tab {
          padding: 15px 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #7f8c8d;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .custom-tab:hover {
          color: #3498db;
          background: rgba(52, 152, 219, 0.05);
        }

        .custom-tab.active {
          color: #3498db;
          border-bottom: 2px solid #3498db;
          background: white;
        }

        .tab-icon {
          font-size: 16px;
        }

        .tab-content {
          padding: 20px;
        }

        .tab-content h3 {
          font-size: 18px;
          margin-top: 0;
          color: #2c3e50;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: #3498db;
        }

        textarea.form-control {
          min-height: 100px;
          resize: vertical;
        }

        .input-group {
          display: flex;
          gap: 8px;
        }

        .input-group .form-control {
          flex: 1;
        }

        .btn-primary {
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #2980b9;
        }

        .btn-secondary {
          background: #f8f9fa;
          color: #555;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #e9ecef;
        }

        .btn-outline {
          background: transparent;
          color: #3498db;
          border: 1px solid #3498db;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          background: rgba(52, 152, 219, 0.1);
        }

        .btn-danger {
          background: #fff5f5;
          color: #e74c3c;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .btn-danger:hover {
          background: #ffecec;
        }

        .document-item {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 15px;
          align-items: end;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .remove-btn {
          margin-bottom: 8px;
        }

        .file-upload {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .file-name {
          font-size: 13px;
          color: #7f8c8d;
        }

        .family-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .family-card {
          background: white;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .family-avatar {
          width: 40px;
          height: 40px;
          background: #e3f2fd;
          color: #3498db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .family-info h4 {
          font-size: 14px;
          margin: 0 0 4px 0;
        }

        .family-info p {
          font-size: 12px;
          color: #7f8c8d;
          margin: 0 0 4px 0;
        }

        .add-family-btn {
          background: #f8f9fa;
          border: 1px dashed #ddd;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #7f8c8d;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-family-btn:hover {
          background: #e9ecef;
          color: #555;
        }

        .health-timeline {
          border-left: 2px solid #eee;
          padding-left: 20px;
          margin-left: 10px;
        }

        .timeline-item {
          position: relative;
          padding-bottom: 20px;
        }

        .timeline-item:before {
          content: '';
          position: absolute;
          left: -26px;
          top: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3498db;
        }

        .timeline-date {
          font-size: 12px;
          color: #7f8c8d;
          margin-bottom: 5px;
        }

        .timeline-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
        }

        .timeline-content h4 {
          font-size: 15px;
          margin: 0 0 8px 0;
        }

        .timeline-content p {
          font-size: 13px;
          color: #555;
          margin: 0 0 12px 0;
        }

        .timeline-actions {
          display: flex;
          gap: 8px;
        }

        .financial-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .financial-card {
          padding: 15px;
          border-radius: 8px;
          color: white;
        }

        .financial-card.primary {
          background: linear-gradient(135deg, #3498db, #2980b9);
        }

        .financial-card.success {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
        }

        .financial-card.warning {
          background: linear-gradient(135deg, #f39c12, #e67e22);
        }

        .financial-card h4 {
          font-size: 14px;
          margin: 0 0 10px 0;
          font-weight: 500;
        }

        .amount {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 5px 0;
        }

        .meta {
          font-size: 12px;
          opacity: 0.9;
          margin: 0;
        }

        .task-list {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }

        .task-item {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          background: white;
        }

        .task-item:last-child {
          border-bottom: none;
        }

        .task-checkbox {
          margin-right: 12px;
        }

        .task-content {
          flex: 1;
        }

        .task-content label {
          font-size: 14px;
          cursor: pointer;
        }

        .task-content label.completed {
          text-decoration: line-through;
          color: #7f8c8d;
        }

        .task-meta {
          font-size: 12px;
          color: #7f8c8d;
          margin: 4px 0 0 0;
        }

        .task-actions {
          margin-left: 10px;
        }

        .add-task {
          display: flex;
          padding: 15px;
          background: #f8f9fa;
        }

        .add-task input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .add-task button {
          margin-left: 8px;
        }

        .priority-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .priority-card {
          background: white;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .priority-icon {
          background: #e3f2fd;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3498db;
        }

        .priority-card h4 {
          font-size: 15px;
          margin: 0 0 5px 0;
        }

        .priority-card p {
          font-size: 13px;
          color: #7f8c8d;
          margin: 0 0 8px 0;
        }

        .progress-bar {
          height: 6px;
          background: #eee;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: #3498db;
        }
      `}</style>
    </div>
  );
};

export default CustomerDetail;