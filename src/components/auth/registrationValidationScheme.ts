import * as Yup from 'yup';

export default Yup.object({
    name: Yup.string().min(2, 'Должно быть минимум 2 символа').max(50, 'Должно быть максимум 50 символов').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Должно быть минимум 6 символов').required('Required'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли отличаются').required('Required'),
})