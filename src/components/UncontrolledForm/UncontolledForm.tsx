import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../form-schema';
import { ValidationError } from 'yup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser } from '../../features/users/users-slice';

const UncontrolledForm: React.FC = () => {
  const countryList = useAppSelector((state) => state.countries.countryList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [nameErr, setNameErr] = useState('');
  const [ageErr, setAgeErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordcConfErr, setPasswordConfErr] = useState('');
  const [genderErr, setGenderErr] = useState('');
  const [acceptTCErr, setAcceptTCErr] = useState('');
  const [pictureErr, setPictureErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [pictureBase64, setPictureBase64] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfInputRef = useRef<HTMLInputElement>(null);
  const acceptTCInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const genderMaleInputRef = useRef<HTMLInputElement>(null);
  const genderFemaleInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const clearErrors = () => {
    setNameErr('');
    setAgeErr('');
    setEmailErr('');
    setPasswordErr('');
    setPasswordConfErr('');
    setGenderErr('');
    setAcceptTCErr('');
    setPictureErr('');
    setCountryErr('');
  };

  const displayErrors = async (errors: ValidationError[]) => {
    errors.forEach((error) => {
      switch (error.path) {
        case 'name':
          setNameErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'age':
          setAgeErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'email':
          setEmailErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'password':
          setPasswordErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'passwordConfirmation':
          setPasswordConfErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'gender':
          setGenderErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'acceptTC':
          setAcceptTCErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'picture':
          setPictureErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        case 'country':
          setCountryErr((prevErr) => (prevErr ? prevErr : error.message));
          break;
        default:
          break;
      }
    });
  };

  const uid = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    let gender: string | null = null;
    if (genderMaleInputRef.current?.checked) {
      gender = genderMaleInputRef.current?.value;
    } else if (genderFemaleInputRef.current?.checked) {
      gender = genderFemaleInputRef.current?.value;
    }
    const formData = {
      name: nameInputRef.current?.value,
      age: ageInputRef.current?.value,
      email: emailInputRef?.current?.value,
      password: passwordInputRef?.current?.value,
      passwordConfirmation: passwordConfInputRef?.current?.value,
      gender,
      acceptTC: acceptTCInputRef?.current?.checked,
      picture: pictureInputRef?.current?.files,
      country: countryInputRef?.current?.value,
    };
    try {
      userSchema.validateSync(formData, { abortEarly: false });
      const user = { ...formData, id: uid(), picture: pictureBase64 };
      delete user.passwordConfirmation;
      dispatch(addUser(user));
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        displayErrors(err.inner);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result ?? '';
      setPictureBase64(String(content));
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Name:
          <div className="validationMessage"> {nameErr}</div>
          <input
            className="inputField"
            type="text"
            name="Name"
            ref={nameInputRef}
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <div className="validationMessage"> {ageErr}</div>
          <input
            className="inputField"
            type="number"
            name="Age"
            ref={ageInputRef}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <div className="validationMessage"> {emailErr}</div>
          <input
            className="inputField"
            type="email"
            name="Email"
            ref={emailInputRef}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <div className="validationMessage"> {passwordErr}</div>
          <input
            className="inputField"
            type="password"
            name="Password"
            ref={passwordInputRef}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <div className="validationMessage"> {passwordcConfErr}</div>
          <input
            className="inputField"
            type="password"
            name="Confirm Password"
            ref={passwordConfInputRef}
          />
        </label>
      </div>
      <div>
        <label>Gender:</label>
        <div className="validationMessage"> {genderErr}</div>
        <label>
          <input
            type="radio"
            name="Gender"
            ref={genderFemaleInputRef}
            value="Male"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="Gender"
            ref={genderMaleInputRef}
            value="Female"
          />
          Female
        </label>
      </div>
      <div>
        <label>
          Accept T&C:
          <div className="validationMessage"> {acceptTCErr}</div>
          <input type="checkbox" name="Accept T&C" ref={acceptTCInputRef} />
        </label>
      </div>
      <div>
        <label>
          Picture:
          <div className="validationMessage"> {pictureErr}</div>
          <input
            type="file"
            name="Picture"
            ref={pictureInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <div className="validationMessage"> {countryErr}</div>
          <input
            className="inputField"
            list="countries"
            name="Country"
            ref={countryInputRef}
          />
          <datalist id="countries">
            {countryList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
