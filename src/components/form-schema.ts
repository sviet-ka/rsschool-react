import * as Yup from 'yup';

export const userSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/[A-Z]\w*/, 'Name should start from a capital letter'),
  age: Yup.number()
    .typeError('Age should be a valid number')
    .required('Age is required')
    .positive('Age should be a positive number')
    .integer('Age should be an integer value'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]+/g, 'Password should contain one lowercase character')
    .matches(/[A-Z]+/g, 'Password should contain one uppercase character')
    .matches(/\d+/g, 'Password should contain one number')
    .matches(
      /[@$!%*#\,?&\.]+/g,
      'Password should contain one special character'
    ),
  passwordConfirmation: Yup.string()
    .required('Password Confirmation is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  gender: Yup.string().required('Gender is required').oneOf(['Male', 'Female']),
  acceptTC: Yup.boolean().oneOf([true], 'Please read and accept T&C'),
  picture: Yup.mixed<File>()
    .required('Picture is required')
    .test(
      'Fichier taille',
      'Picture is too large',
      (value) => value.size <= 1024 * 1024
    )
    .test('format', 'Unsupported format', (value) =>
      ['image/jpeg', 'image/png'].includes(value.type)
    ),
  country: Yup.string().required('Country is required'),
});
