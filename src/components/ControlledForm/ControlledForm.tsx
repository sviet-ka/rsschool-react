import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../form-schema';
import { addUser } from '../../features/users/users-slice';

interface UserForm {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  acceptTC: NonNullable<boolean | undefined>;
  picture?: FileList;
  country: string;
}

const ControlledForm: React.FC = () => {
  const countryList = useAppSelector((state) => state.countries.countryList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserForm>({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  const [pictureBase64, setPictureBase64] = useState('');

  const uid = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

  const onSubmitHandler = (data: UserForm) => {
    const user = { ...data, id: uid(), picture: pictureBase64 };
    dispatch(addUser(user));
    navigate('/');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(errors);

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
    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <div>
        <label>
          Name:
          <div className="validationMessage">{errors.name?.message}</div>
          <input {...register('name')} className="inputField" type="text" />
        </label>
      </div>
      <div>
        <label>
          Age:
          <div className="validationMessage">{errors.age?.message}</div>
          <input {...register('age')} className="inputField" type="number" />
        </label>
      </div>
      <div>
        <label>
          Email:
          <div className="validationMessage">{errors.email?.message}</div>
          <input className="inputField" type="email" {...register('email')} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <div className="validationMessage">{errors.password?.message}</div>
          <input
            className="inputField"
            type="password"
            {...register('password')}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <div className="validationMessage">
            {errors.passwordConfirmation?.message}
          </div>
          <input
            className="inputField"
            type="password"
            {...register('passwordConfirmation')}
          />
        </label>
      </div>
      <div>
        <label>Gender:</label>
        <div className="validationMessage">{errors.gender?.message}</div>
        <label>
          <input type="radio" {...register('gender')} value="Male" />
          Male
        </label>
        <label>
          <input type="radio" {...register('gender')} value="Female" />
          Female
        </label>
      </div>
      <div>
        <label>
          Accept T&C:
          <div className="validationMessage">{errors.acceptTC?.message}</div>
          <input type="checkbox" {...register('acceptTC')} />
        </label>
      </div>
      <div>
        <label>
          Picture:
          <div className="validationMessage">{errors.picture?.message}</div>
          <input
            type="file"
            {...register('picture')}
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <div className="validationMessage">{errors.country?.message}</div>
          <input
            className="inputField"
            list="countries"
            {...register('country')}
          />
          <datalist id="countries">
            {countryList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </label>
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
