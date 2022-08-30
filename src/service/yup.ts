import * as yup from 'yup';

export const UrlValidation = yup.object({
  url: yup
    .string()
    .required('Please Write Video URL')
    .matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/, 'Invalid Link'),
});

export const InputValidation = yup.object({
  title: yup.string().required('⚠ Please write title'),
  description: yup.string().max(1000, '⚠ Must be 1000 char or less').required('⚠ Please write description'),
  projectStory: yup.string().max(2500, '⚠ Must be 2500 char or less').required('⚠ Please write project story '),
  genre: yup.object().required('Please Select Genre'),
  sourceLang: yup.object().required('Please Select Source Language'),
  targetLang: yup.object().required('Please Select Target Languages'),
});

export const MinimumAmountValidation = yup.object({
  minimumAmount: yup.object().required('Please select minimum acount'),
});

export const FolderInfoValidation = yup.object({
  title: yup.string().max(50, 'Maximum character allowed is up to 50 characters.').required('Please enter the title'),
  // translator: yup.string().matches(/^[A-Za-z+/\s/]*$/),
  targetLanguage: yup.object().required('Please enter the target language.'),
});

export const CreateEpisodeValidation = yup.object({
  episode: yup.number().typeError('Enter only number.').required('Enter the episode number.').positive().integer(),
});

export const SigninValidation = yup.object({
  email: yup.string().email('Please enter valid email').required('Please Enter your email'),
  password: yup.string().required('Please enter your password'),
});

export const EmailValidation = yup.object({
  email: yup.string().email('Please enter valid email').required('Please Enter your email'),
});

export const InviteMemberValidation = yup.object({
  email: yup.string().email('Invalid email address'),
  name: yup.string().max(50, 'Maximum character allowed is up to 50 characters'),
  group: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  sourceLanguage: yup.object().optional(),
  targetLanguage: yup.object().optional(),
});

export const SignUpValidation = yup.object({
  email: yup.string().email('Please enter valid email').required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      'Your password does not meet the requirements.'
      // 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Password does not match.'),
});

export const CreatePieceValidation = yup.object({
  title: yup.string().max(50, 'Maximum character allowed is up to 50 characters.').required('Please enter the title'),
  desc: yup.string().max(1000, 'Maximum character allowed is up to 50 characters.').required('Please enter the title'),
});
