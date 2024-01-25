// CrudSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  crud: [],
  formConfigurations: [],
  count: 1,
  formData: {
    name: '',
    email: '',
    phone: '',
    gender: '',
    qualification: 'SSC',
    agreeToTerms: false,
    message: '',
    nameArray: [],
    emailArray: [],
    phoneArray: [],
  },
};

const crud = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    saveFormConfiguration: (state, action) => {
      state.formConfigurations = [...state.formConfigurations, action.payload];
    },
    setField: (state, action) => {
      const { field, value } = action.payload;
      if (field === 'name' || field === 'email' || field === 'phone') {
        state.formData[`${field}Array`] = [
          ...state.formData[`${field}Array`],
          value !== null ? { [field]: value } : undefined,
        ];
      } else {
        state.formData[field] = value;
      }
    },
    submitValue: (state) => {
      const newEntry = {
        id: state.count,
        names: state.formData.nameArray.filter((item) => item !== undefined),
        emails: state.formData.emailArray.filter((item) => item !== undefined),
        phones: state.formData.phoneArray.filter((item) => item !== undefined),
        gender: state.formData.gender,
        qualification: state.formData.qualification,
        message: state.formData.message,
      };

      state.crud = [...state.crud, newEntry];
      state.count += 1;

      // Reset form data
      state.formData = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        qualification: 'SSC',
        agreeToTerms: false,
        message: '',
        nameArray: [],
        emailArray: [],
        phoneArray: [],
      };
    },
    deleteValue: (state, action) => {
      state.crud = state.crud.filter((e) => e.id !== action.payload);
    },
    loadFormConfiguration: (state, action) => {
      const { name, email, phone, gender, qualification, agreeToTerms, message } = action.payload;
      state.formData.name = name || '';
      state.formData.email = email || '';
      state.formData.phone = phone || '';
      state.formData.gender = gender || '';
      state.formData.qualification = qualification || 'SSC';
      state.formData.agreeToTerms = agreeToTerms || false;
      state.formData.message = message || '';
    },
    setGender: (state, action) => {
      state.formData.gender = action.payload;
    },
    setQualification: (state, action) => {
      state.formData.qualification = action.payload;
    },
    setAgreeToTerms: (state, action) => {
      state.formData.agreeToTerms = action.payload;
    },
    setMessage: (state, action) => {
      state.formData.message = action.payload;
    },
  },
});

export const {
  submitValue,
  deleteValue,
  setField,
  setGender,
  setQualification,
  setAgreeToTerms,
  setMessage,
  saveFormConfiguration,
  loadFormConfiguration,
} = crud.actions;

export default crud.reducer;
