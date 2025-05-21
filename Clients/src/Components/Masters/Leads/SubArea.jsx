import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

const SubArea = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [area, setArea] = useState('');
  const [subAreaName, setSubAreaName] = useState('');
  const [subAreas, setSubAreas] = useState([
    { id: 1, area: 'MP Nagar', pincode: '462011', subArea: 'Zone-1' },
    { id: 2, area: 'Mandideep', pincode: '462046', subArea: 'Satlapur' },
    { id: 3, area: 'Bhel', pincode: '462023', subArea: 'Ananad Nagar' },
    { id: 4, area: 'City', pincode: '462030', subArea: 'Jumerati' },
    { id: 5, area: 'Arera Colony', pincode: '462016', subArea: 'Shahpura' },
    { id: 6, area: 'Arera Colony', pincode: '462016', subArea: 'E-1 Arera Colony' },
    { id: 7, area: 'Hoshangabad Road', pincode: '462026', subArea: 'Vidya Nagar' },
    { id: 8, area: 'Hoshangabad Road', pincode: '462026', subArea: 'Danish Nagar' },
    { id: 9, area: 'Hoshangabad Road', pincode: '462026', subArea: 'Sriram Colony' }
  ]);

  const areaOptions = [
    { name: 'Arera Colony', pincode: '462016' },
    { name: 'Hoshangabad Road', pincode: '462026' },
    { name: 'Hoshangabad Road', pincode: '462047' },
    { name: 'City', pincode: '462030' },
    { name: 'Bhel', pincode: '462023' },
    { name: 'Mandideep', pincode: '462046' },
    { name: 'Bhel', pincode: '462022' },
    { name: 'MP Nagar', pincode: '462011' },
    { name: 'Bhel', pincode: '462021' },
    { name: 'Bhel', pincode: '462041' },
    { name: 'Hoshangabad Road', pincode: '462045' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedArea = areaOptions.find(
      (opt) => `${opt.name} (${opt.pincode})` === area
    );
    if (selectedArea && subAreaName.trim()) {
      const newSubArea = {
        id: subAreas.length + 1,
        area: selectedArea.name,
        pincode: selectedArea.pincode,
        subArea: subAreaName
      };
      setSubAreas([...subAreas, newSubArea]);
      setArea('');
      setSubAreaName('');
      setActiveTab('view');
    }
  };

  return (
      <div className="card shadow-lg rounded">
        <div style={{background: "#7A6FBE"}} className="card-header  text-black d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Sub Areas</h5>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button style={{ color:"black !important" }}
                className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                onClick={() => setActiveTab('view')}
              >
                View Data
              </button>
            </li>
            <li className="nav-item text-white">
              <button  style={{ color:"black" }}
                className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
                onClick={() => setActiveTab('add')}
              >
                Add Sub Area
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Select Area</label>
                  <select
                    className="form-select"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Area --</option>
                    {areaOptions.map((opt, idx) => (
                      <option key={idx} value={`${opt.name} (${opt.pincode})`}>
                        {opt.name} ({opt.pincode})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Sub Area Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subAreaName}
                    onChange={(e) => setSubAreaName(e.target.value)}
                    placeholder="Enter Sub Area Name"
                    required
                  />
                </div>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-plus"></i> Save Sub Area
                </button>
              </div>
            </form>
          )}

          {activeTab === 'view' && (
            <div className="table-responsive">
              <table className="table table-hover table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Area</th>
                    <th>Pincode</th>
                    <th>Sub Area</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subAreas.map((area, index) => (
                    <tr key={area.id}>
                      <td>{index + 1}</td>
                      <td>{area.area}</td>
                      <td>{area.pincode}</td>
                      <td>{area.subArea}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="fa fa-pencil"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {subAreas.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-muted">No sub areas added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
};

export default SubArea;
