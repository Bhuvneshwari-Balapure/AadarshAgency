import React, { useState } from 'react';

const AddProspectLead = () => {
  const [form, setForm] = useState({
    group_code: '',
    salutation: 'Mr.',
    name: '',
    gender: 'Male',
    comp_name: '',
    designation: '',
    annual_income: 'Choose',
    grade: '1',
    mobile: '',
    contact_no: '',
    whatsapp_no: '',
    pa_name: '',
    pa_relation: '',
    pa_mobile: '',
    email: '',
    dob: '',
    dob_record: '',
    dom: '',
    resi_addr: '',
    resi_landmark: '',
    resi_pincode: '',
    office_addr: '',
    office_landmark: '',
    office_pincode: '',
    pref_meet_addr: '',
    pref_area: '',
    meeting_time: '',
    city: '',
    aadhar_no: '',
    pan_no: '',
    lead_source: 'Choose',
    lead_name: 'Choose',
    lead_occupation: 'Businessman',
    lead_occupation_type: 'CA',
    calling_purpose: '',
    call_name: '',
    remark: ''
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
      address = form.resi_addr;
      pincode = form.resi_pincode;
    } else if (value === 'textbox2') {
      address = form.office_addr;
      pincode = form.office_pincode;
    }

    setForm(prev => ({
      ...prev,
      pref_meet_addr: address
    }));

    fetchAreaByPincode(pincode);
  };

  const fetchAreaByPincode = async (pin) => {
    try {
      const response = await axios.post('ajax/backend.php', { pin1: pin });
      const json = response.data;
      const area = Object.values(json)[1];
      setForm(prev => ({ ...prev, pref_area: area }));
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
    <section className="content bg-white p-4">
      <h3 className='mb-4'>Prospect Master</h3>
      <div className="row">
        <div className="col-lg-12 col-xs-12">
          <div className="box box-primary">
            <div className="box-body">
              <form onSubmit={handleSubmit} className="row g-3">
                {/* Group Code */}
                <div className="form-group col-md-2 col-xs-3 mb-3">
                  <label>Group</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    type="text"
                    name="group_code"
                    value={form.group_code}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Code"
                  />
                </div>

                {/* Salutation */}
                <div className="form-group col-md-2 col-xs-3 mb-3">
                  <label>Salutation</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="salutation"
                    value={form.salutation}
                    onChange={handleChange}
                    className="form-control"
                  >
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
                <div className="form-group col-md-5 col-xs-6 mb-3">
                  <label>Family Head</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                {/* Gender */}
                <div className="form-group col-md-3 col-xs-4 mb-3">
                  <label>Gender</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>

                {/* Organisation */}
                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>Organisation</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="comp_name"
                    value={form.comp_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                {/* Designation */}
                <div className="form-group col-md-3 col-xs-4 mb-3">
                  <label>Designation</label>
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Designation"
                  />
                </div>

                {/* Annual Income */}
                <div className="form-group col-md-3 mb-3">
                  <label>Family Annual Income</label>
                  <select
                    name="annual_income"
                    value={form.annual_income}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>Choose</option>
                    <option value="1">25 lakh to 1 Cr.</option>
                    <option value="2">5 to 25 lakh</option>
                    <option value="3">2.5 to 5 lakh</option>
                  </select>
                </div>

                {/* Grade */}
                <div className="form-group col-md-2 mb-3">
                  <label>Grade</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>

                {/* Mobile, Contact, WhatsApp */}
                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>Reg. Mob</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile"
                  />
                </div>

                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>Contact No.</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="contact_no"
                    value={form.contact_no}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Contact No"
                  />
                </div>

                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>Whatsapp No.</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="whatsapp_no"
                    value={form.whatsapp_no}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Whatsapp No"
                  />
                </div>

                {/* PA Details */}
                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>PA Name</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pa_name"
                    value={form.pa_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter PA Name"
                  />
                </div>

                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>PA's Relation</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pa_relation"
                    value={form.pa_relation}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Relation"
                  />
                </div>

                <div className="form-group col-md-4 col-xs-4 mb-3">
                  <label>PA Mobile No</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pa_mobile"
                    value={form.pa_mobile}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter PA Mobile No"
                  />
                </div>

                {/* Email, DOB, DOM */}
                <div className="form-group col-md-3 col-xs-4 mb-3">
                  <label>Email id.</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Date of Birth (Actual)</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Date of Birth (Record)</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="dob_record"
                    value={form.dob_record}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Marriage Date</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="dom"
                    value={form.dom}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                {/* Residential Address */}
                <div className="form-group col-md-1 col-xs-2 mb-3">
                  <label>Select</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    type="radio"
                    name="sourceRadio"
                    value="textbox1"
                    id="radioTextbox1"
                    checked={sourceRadio === 'textbox1'}
                    onChange={handleRadioChange}
                  />
                </div>

                <div className="form-group col-md-5 col-xs-10 mb-3">
                  <label>Resi. Address</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    id="textbox1"
                    name="resi_addr"
                    value={form.resi_addr}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Resi. Address"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Landmark</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="resi_landmark"
                    value={form.resi_landmark}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Landmark"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Pin Code</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    id="textbox12"
                    name="resi_pincode"
                    value={form.resi_pincode}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Pin Code"
                  />
                </div>

                {/* Office Address */}
                <div className="form-group col-md-1 col-xs-2 mb-3">
                  <label>Select</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    type="radio"
                    name="sourceRadio"
                    value="textbox2"
                    id="radioTextbox2"
                    checked={sourceRadio === 'textbox2'}
                    onChange={handleRadioChange}
                  />
                </div>

                <div className="form-group col-md-5 col-xs-10 mb-3">
                  <label>Off. Address</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    id="textbox2"
                    name="office_addr"
                    value={form.office_addr}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Office Address"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Landmark</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="office_landmark"
                    value={form.office_landmark}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Landmark"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label>Pincode</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    id="textbox21"
                    name="office_pincode"
                    value={form.office_pincode}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Pin Code"
                  />
                </div>

                {/* Preferred Meeting Address */}
                <div className="form-group col-md-1 col-xs-2 mb-3">
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                </div>

                <div className="form-group col-md-5 mb-3">
                  <label style={{ color: 'blue', fontWeight: 'bold' }}>Preferred Meeting Address</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pref_meet_addr"
                    value={form.pref_meet_addr}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="destinationTextbox"
                    placeholder="Preferred Meeting Address"
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label style={{ color: 'blue', fontWeight: 'bold' }}>Area</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pref_area"
                    value={form.pref_area}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="area123"
                    placeholder="Preferred Meeting Area"
                  />
                </div>

                {/* Meeting Time Slot */}
                <div className="form-group col-md-3 mb-3">
                  <label style={{ color: 'blue', fontWeight: 'bold' }}>Meeting Time Slot</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    className="form-control"
                    name="meeting_time"
                    value={form.meeting_time}
                    onChange={handleChange}
                  >
                    <option value="">--Choose--</option>
                    <option>08:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                    <option>05:00 PM</option>
                    <option>06:00 PM</option>
                    <option>07:00 PM</option>
                    <option>08:00 PM</option>
                  </select>
                </div>

                {/* City, Aadhar, Pan */}
                <div className="form-group col-md-4 col-xs-6 mb-3">
                  <label>City</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option></option>
                    <option>Choose</option>
                    <option>Bhopal</option>
                  </select>
                </div>

                <div className="form-group col-md-4 col-xs-6 mb-3">
                  <label>Aadhar No</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="aadhar_no"
                    value={form.aadhar_no}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                  />
                </div>

                <div className="form-group col-md-4 col-xs-6 mb-3">
                  <label>Pan No.</label>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="pan_no"
                    value={form.pan_no}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                  />
                </div>

                {/* Lead Information */}
                <div className="form-group col-md-3 col-xs-6 mb-3">
                  <label>Lead Source</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="lead_source"
                    value={form.lead_source}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>Choose</option>
                    <option>Orgnaization Data</option>
                    <option>Digital Platform</option>
                    <option>Digital Platform</option>
                    <option>Digital Platform</option>
                    <option>Digital Platform</option>
                    <option>Digital Platform</option>
                    <option>Orgnaization Data</option>
                    <option>Orgnaization Data</option>
                    <option>Administrator Referral</option>
                  </select>
                </div>

                <div className="form-group col-md-3 col-xs-6 mb-3">
                  <label>Lead Name</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="lead_name"
                    value={form.lead_name}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>Choose</option>
                    <option>Barkatullah</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Google Search</option>
                    <option>Youtube</option>
                    <option>Twitter</option>
                    <option>C I Automobile</option>
                    <option>CAR SEGMENT</option>
                    <option>test</option>
                  </select>
                </div>

                <div className="form-group col-md-3 col-xs-6 mb-3">
                  <label>Lead Occupation</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="lead_occupation"
                    value={form.lead_occupation}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>Businessman</option>
                    <option>Private Service</option>
                    <option>Government Service</option>
                    <option>Retiered Person</option>
                    <option>Agreeculturist</option>
                    <option>Housewife</option>
                    <option>Student</option>
                    <option>Not Specified</option>
                  </select>
                </div>

                <div className="form-group col-md-3 col-xs-6 mb-3">
                  <label>Lead Occupation Type</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="lead_occupation_type"
                    value={form.lead_occupation_type}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option>CA</option>
                    <option>abc</option>
                    <option>test</option>
                  </select>
                </div>

                {/* Calling Purpose */}
                <div className="form-group col-md-6 col-xs-6 mb-3">
                  <label>Calling Purpose</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="calling_purpose"
                    value={form.calling_purpose}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option></option>
                    <option value="">Choose</option>
                    <option>Marketing</option>
                    <option>Servicing</option>
                  </select>
                </div>

                <div className="form-group col-md-6 col-xs-6 mb-3">
                  <label>Name</label>
                  <select
                    style={{ border: '1px solid #636363' }}
                    name="call_name"
                    value={form.call_name}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option></option>
                    <option>Choose</option>
                    <option>LIC</option>
                    <option>Portfolio Management</option>
                  </select>
                </div>

                {/* Remark */}
                <div className="form-group col-md-12 mb-3">
                  <label>Remark</label>
                  <textarea
                    className="form-control"
                    name="remark"
                    value={form.remark}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="box-footer col-12 text-center mt-3">
                  <button
                    style={{ border: '1px solid #636363' }}
                    name="submit"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                  <input
                    style={{ border: '1px solid #636363' }}
                    name="id"
                    type="hidden"
                    className="btn btn-primary"
                    value=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProspectLead;