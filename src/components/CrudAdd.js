import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitValue,
  setField,
  setGender,
  setQualification,
  setAgreeToTerms,
  setMessage,
  deleteValue,
  saveFormConfiguration,
  loadFormConfiguration,
} from '../slices/CrudSlice';
import { Link } from 'react-router-dom';

const CrudAdd = () => {
  const [isGovernmentServant, setIsGovernmentServant] = useState(false);
  const { crud, formData } = useSelector((state) => state.crud);
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState('');

  const [additionalNameFields, setAdditionalNameFields] = useState([]);
  const [additionalEmailFields, setAdditionalEmailFields] = useState([]);
  const [additionalPhoneFields, setAdditionalPhoneFields] = useState([]);

  const addFieldName = () => {
    setAdditionalNameFields((prevFields) => [...prevFields, '']);
  };

  const removeFieldName = (index) => {
    const updatedFields = [...additionalNameFields];
    updatedFields.splice(index, 1);
    setAdditionalNameFields(updatedFields);
  };

  const addFieldEmail = () => {
    setAdditionalEmailFields((prevFields) => [...prevFields, '']);
  };

  const removeFieldEmail = (index) => {
    const updatedFields = [...additionalEmailFields];
    updatedFields.splice(index, 1);
    setAdditionalEmailFields(updatedFields);
  };

  const addFieldPhone = () => {
    setAdditionalPhoneFields((prevFields) => [...prevFields, '']);
  };

  const removeFieldPhone = (index) => {
    const updatedFields = [...additionalPhoneFields];
    updatedFields.splice(index, 1);
    setAdditionalPhoneFields(updatedFields);
  };

  const handleFieldChange = (field, index, value) => {
    switch (field) {
      case 'name':
        setAdditionalNameFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[index] = value;
          return updatedFields;
        });
        break;
      case 'email':
        setAdditionalEmailFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[index] = value;
          return updatedFields;
        });
        break;
      case 'phone':
        setAdditionalPhoneFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[index] = value;
          return updatedFields;
        });
        break;
      default:
        break;
    }

    dispatch(setField({ field, value }));
  };
  const saveFormConfig = () => {
    const formConfig = {
        // name: formData.name,
        // email: formData.email,
        // phone: formData.phone,
      nameArray: formData.nameArray.map((item) => item.name).filter(Boolean),
      emailArray: formData.emailArray.map((item) => item.email).filter(Boolean),
      phoneArray: formData.phoneArray.map((item) => item.phone).filter(Boolean),
      imageName: imageName,
      gender: formData.gender,
      qualification: formData.qualification,
      agreeToTerms: formData.agreeToTerms,
      message: formData.message,
    };
  
    // Dispatch the action to save the form configuration
    dispatch(saveFormConfiguration(formConfig));
  
    // Show the JSON data in an alert
    alert(JSON.stringify(formConfig, null, 2));
  };
  
  

  const loadFormConfig = (config) => {
    dispatch(loadFormConfiguration(config));
  };

  const handleGovernmentChange = (e) => {
    setIsGovernmentServant(e.target.value === 'yes');
  };

  return (
    <React.Fragment>
      <div className="container">
        <h2 className="text-center mb-5">Dynamic Form Generator Application</h2>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">Name: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => dispatch(setField({ field: 'name', value: e.target.value }))}
            />

            {additionalNameFields.map((value, index) => (
              <div key={index}>
                <label htmlFor={`additionalName${index}`}>Additional Name: </label>
                <input
                  className="form-control"
                  type="text"
                  id={`additionalName${index}`}
                  value={value}
                  onChange={(e) => handleFieldChange('name', index, e.target.value)}
                />
                <button className="btn btn-danger my-2" onClick={() => removeFieldName(index)}>
                  Remove Name Field
                </button>
              </div>
            ))}

            <button className="btn btn-primary my-2" onClick={addFieldName}>
              Add Name Field
            </button>
          </div>

          <div className="col-md-6">
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => dispatch(setField({ field: 'email', value: e.target.value }))}
            />

            {additionalEmailFields.map((value, index) => (
              <div key={index}>
                <label htmlFor={`additionalEmail${index}`}>Additional Email: </label>
                <input
                  className="form-control"
                  type="text"
                  id={`additionalEmail${index}`}
                  value={value}
                  onChange={(e) => handleFieldChange('email', index, e.target.value)}
                />
                <button className="btn btn-danger my-2" onClick={() => removeFieldEmail(index)}>
                  Remove Email Field
                </button>
              </div>
            ))}

            <button className="btn btn-primary my-2" onClick={addFieldEmail}>
              Add Email Field
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <label htmlFor="phone">Phone Number: </label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => dispatch(setField({ field: 'phone', value: e.target.value }))}
            />

            {additionalPhoneFields.map((value, index) => (
              <div key={index}>
                <label htmlFor={`additionalPhone${index}`}>Additional Phone: </label>
                <input
                  className="form-control"
                  type="text"
                  id={`additionalPhone${index}`}
                  value={value}
                  onChange={(e) => handleFieldChange('phone', index, e.target.value)}
                />
                <button className="btn btn-danger my-2" onClick={() => removeFieldPhone(index)}>
                  Remove Phone Field
                </button>
              </div>
            ))}

            <button className="btn btn-primary my-2" onClick={addFieldPhone}>
              Add Phone Field
            </button>
          </div>

          <div className="col-md-6">
            <label htmlFor="gender">Gender: </label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => dispatch(setGender(e.target.value))}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => dispatch(setGender(e.target.value))}
            />
            <label htmlFor="female">Female</label> <br />
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <label htmlFor="qualification">Highest Qualification: </label>
            <select
              name="qualification"
              className="form-control"
              id="qualification"
              onChange={(e) => dispatch(setQualification(e.target.value))}
            >
              <option value="SSC">SSC</option>
              <option value="HSC">HSC</option>
              <option value="Diploma">Diploma</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="message">Message: </label>
            <textarea
              className="form-control"
              id="message"
              onChange={(e) => dispatch(setMessage(e.target.value))}
            />
          </div>
        </div>

        <label htmlFor="agree">Agree to Terms: </label>
        <input
          type="checkbox"
          id="agree"
          onChange={(e) => dispatch(setAgreeToTerms(e.target.checked))}
        />
        <br />
        <div className="form-group my-5">
          <label htmlFor="">Are you a government servant?</label>
          <select
            className="form-control"
            name="government"
            id=""
            onChange={handleGovernmentChange}
          >
            <option>select options</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {isGovernmentServant && (
          <div className="form-group">
            <label htmlFor="">Image</label>
            <input
            type="file"
            className="form-control-file"
            name=""
            id=""
            placeholder=""
            aria-describedby="fileHelpId"
            onChange={(e) => {
              const fileName = e.target.files[0]?.name || '';
              setImageName(fileName);
            }}
          />

          </div>
        )}

        <Link to="/">
          <button className="btn btn-primary my-5" onClick={() => dispatch(submitValue())}>
            Submit
          </button>
        </Link>

        <div className="col-md-6">
          <button className="btn btn-success my-2" onClick={saveFormConfig}>
            Save Form Configuration
          </button>
        </div>
        <div className="col-md-6">
        {crud.formConfigurations && crud.formConfigurations.length > 0 && (
  <div>
    <label htmlFor="loadConfig">Load Form Configuration: </label>
    <select
      name="loadConfig"
      className="form-control"
      onChange={(e) => loadFormConfig(JSON.parse(e.target.value))}
    >
      <option value="">Select a configuration</option>
      {crud.formConfigurations.map((config, index) => (
        <option key={index} value={JSON.stringify(config)}>
          Configuration {index + 1}
        </option>
      ))}
    </select>
  </div>
)}

        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Names</th>
                <th>Emails</th>
                <th>Phones</th>
                <th>Gender</th>
                <th>Qualification</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {crud.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.names.map((nameObj) => nameObj.name).join(', ')}</td>
                  <td>{d.emails.map((emailObj) => emailObj.email).join(', ')}</td>
                  <td>{d.phones.map((phoneObj) => phoneObj.phone).join(', ')}</td>
                  <td>{d.gender}</td>
                  <td>{d.qualification}</td>
                  <td>{d.message}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteValue(d.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CrudAdd;
