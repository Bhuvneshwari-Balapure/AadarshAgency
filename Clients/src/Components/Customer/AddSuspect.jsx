import React, { useState } from 'react';

const AddSuspect = () => {
  const [form, setForm] = useState({
    salutation: '',
    familyHead: '',
    gender: '',
    organisation: '',
    designation: '',
    annualIncome: '',
    grade: '',
    mobile: '',
    contactNo: '',
    whatsapp: '',
    email: '',
    dob: '',
    dom: '',
    resiAddr: '',
    resiLandmark: '',
    resiPincode: '',
    officeAddr: '',
    officeLandmark: '',
    officePincode: '',
    preferredMeetingAddr: '',
    preferredMeetingArea: '',
    city: '',
  });

  const [sourceRadio, setSourceRadio] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSourceRadio(value);
    let address = '';
    let pincode = '';

    if (value === 'textbox1') {
      address = form.resiAddr;
      pincode = form.resiPincode;
    } else if (value === 'textbox2') {
      address = form.officeAddr;
      pincode = form.officePincode;
    }

    setForm(prev => ({
      ...prev,
      preferredMeetingAddr: address
    }));

    fetchAreaByPincode(pincode);
  };

  const fetchAreaByPincode = async (pin) => {
    try {
      const response = await axios.post('ajax/backend.php', { pin1: pin });
      const json = response.data;
      const area = Object.values(json)[1];
      setForm(prev => ({ ...prev, preferredMeetingArea: area }));
    } catch (error) {
      console.error('Error fetching area:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // Submit form to backend API
  };

  return (

    <div className='bg-white p-4'>
 <h3 className='mb-5'>Add Suspect Leads</h3>
      <form onSubmit={handleSubmit} className="row g-3"> {/* Added g-3 for gutter spacing */}

        {/* Salutation */}
        <div className="form-group col-md-2 col-xs-3 mb-3">
          <label>Salutation</label>
          <select name="salutation" value={form.salutation} onChange={handleChange} className="form-control">
            <option value="">Select</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Mast.</option>
            <option>Shri.</option>
            <option>Smt.</option>
            <option>Kum.</option>
            <option>Kr.</option>
            <option>Dr.</option>
          </select>
        </div>

        {/* Family Head */}
        <div className="form-group col-md-5 col-xs-9 mb-3">
          <label>Family Head</label>
          <input name="familyHead" value={form.familyHead} onChange={handleChange} type="text" className="form-control" placeholder="Name" />
        </div>

        {/* Gender */}
        <div className="form-group col-md-3 col-xs-4 mb-3">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="form-control">
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        {/* Organisation */}
        <div className="form-group col-md-3 col-xs-4 mb-3">
          <label>Organisation</label>
          <input name="organisation" value={form.organisation} onChange={handleChange} type="text" className="form-control" />
        </div>

        {/* Designation */}
        <div className="form-group col-md-3 col-xs-4 mb-3">
          <label>Designation</label>
          <input name="designation" value={form.designation} onChange={handleChange} type="text" className="form-control" />
        </div>

        {/* Annual Income */}
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Annual Income</label>
          <select name="annualIncome" value={form.annualIncome} onChange={handleChange} className="form-control">
            <option>Choose</option>
            <option value="1">25 lakh to 1 Cr.</option>
            <option value="2">5 to 25 lakh</option>
            <option value="3">2.5 to 5 lakh</option>
          </select>
        </div>

        {/* Grade */}
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Grade</label>
          <select name="grade" value={form.grade} onChange={handleChange} className="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        {/* Mobile, Contact, WhatsApp */}
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>Mobile No.</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} type="text" className="form-control" />
        </div>
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>Contact No.</label>
          <input name="contactNo" value={form.contactNo} onChange={handleChange} type="text" className="form-control" />
        </div>
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>WhatsApp</label>
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} type="text" className="form-control" />
        </div>

        {/* Email, DOB, DOM */}
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" />
        </div>
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>DOB</label>
          <input name="dob" value={form.dob} onChange={handleChange} type="date" className="form-control" />
        </div>
        <div className="form-group col-md-4 col-xs-4 mb-3">
          <label>DOM</label>
          <input name="dom" value={form.dom} onChange={handleChange} type="date" className="form-control" />
        </div>

        {/* Resi. Address */}
        <div className="form-group col-md-1 col-xs-2 mb-3">
          <label>Select</label>
          <input type="radio" name="sourceRadio" value="textbox1" checked={sourceRadio === 'textbox1'} onChange={handleRadioChange} className="mt-2" />
        </div>
        <div className="form-group col-md-5 col-xs-10 mb-3">
          <label>Resi. Address</label>
          <input name="resiAddr" value={form.resiAddr} onChange={handleChange} type="text" className="form-control" id="textbox1" />
        </div>
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Landmark</label>
          <input name="resiLandmark" value={form.resiLandmark} onChange={handleChange} type="text" className="form-control" />
        </div>
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Pin Code</label>
          <input name="resiPincode" value={form.resiPincode} onChange={handleChange} type="text" className="form-control" id="textbox12" />
        </div>

        {/* Office Address */}
        <div className="form-group col-md-1 col-xs-2 mb-3">
          <label>Select</label>
          <input type="radio" name="sourceRadio" value="textbox2" checked={sourceRadio === 'textbox2'} onChange={handleRadioChange} className="mt-2" />
        </div>
        <div className="form-group col-md-5 col-xs-10 mb-3">
          <label>Office Address</label>
          <input name="officeAddr" value={form.officeAddr} onChange={handleChange} type="text" className="form-control" id="textbox2" />
        </div>
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Landmark</label>
          <input name="officeLandmark" value={form.officeLandmark} onChange={handleChange} type="text" className="form-control" />
        </div>
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>Pincode</label>
          <input name="officePincode" value={form.officePincode} onChange={handleChange} type="text" className="form-control" id="textbox21" />
        </div>

        {/* Preferred Meeting Address & Area */}
        <div className="form-group col-md-5 col-xs-10 mb-3">
          <label><b style={{ color: 'blue' }}>Preferred Meeting Address</b></label>
          <input name="preferredMeetingAddr" value={form.preferredMeetingAddr} onChange={handleChange} type="text" className="form-control" />
        </div>
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label><b style={{ color: 'blue' }}>Area</b></label>
          <input name="preferredMeetingArea" value={form.preferredMeetingArea} onChange={handleChange} type="text" className="form-control" id="area123" />
        </div>

        {/* City */}
        <div className="form-group col-md-3 col-xs-6 mb-3">
          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} type="text" className="form-control" />
        </div>

        <div className="form-group col-12 text-center mt-4 mb-3">
          <button type="submit" className="btn btn-primary px-4 py-2">Submit</button>
        </div>

      </form>
    </div>
  );
};

export default AddSuspect;