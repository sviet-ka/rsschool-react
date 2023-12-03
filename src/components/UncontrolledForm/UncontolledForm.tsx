import { FormEvent, useRef, useState } from 'react';
import { userSchema } from '../form-schema';
import { ValidationError } from 'yup';

const COUNTRIES = ['USA', 'UK', 'Canada', 'Mexico'];

const UncontrolledForm: React.FC = () => {
  const [nameErr, setNameErr] = useState('');
  const [ageErr, setAgeErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordcConfErr, setPasswordConfErr] = useState('');
  const [genderErr, setGenderErr] = useState('');
  const [acceptTCErr, setAcceptTCErr] = useState('');
  const [pictureErr, setPictureErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
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
      picture: pictureInputRef?.current?.files?.[0],
      country: countryInputRef?.current?.value,
    };
    try {
      userSchema.validateSync(formData, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        displayErrors(err.inner);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Name:
          <input type="text" name="Name" ref={nameInputRef} />
          {nameErr}
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" name="Age" ref={ageInputRef} />
          {ageErr}
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="Email" ref={emailInputRef} />
          {emailErr}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="text" name="Password" ref={passwordInputRef} />
          {passwordErr}
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input
            type="text"
            name="Confirm Password"
            ref={passwordConfInputRef}
          />
          {passwordcConfErr}
        </label>
      </div>
      <div>
        <label>
          Gender:
          <input
            type="radio"
            name="Gender"
            ref={genderFemaleInputRef}
            value="Male"
          />
          Male
          <input
            type="radio"
            name="Gender"
            ref={genderMaleInputRef}
            value="Female"
          />
          Female
          {genderErr}
        </label>
      </div>
      <div>
        <label>
          Accept T&C:
          <input type="checkbox" name="Accept T&C" ref={acceptTCInputRef} />
          {acceptTCErr}
        </label>
      </div>
      <div>
        <label>
          Picture:
          <input type="file" name="Picture" ref={pictureInputRef} />
          {pictureErr}
        </label>
      </div>
      <div>
        <label>
          Country:
          <input list="countries" name="Country" ref={countryInputRef} />
          <datalist id="countries">
            {COUNTRIES.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {countryErr}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
