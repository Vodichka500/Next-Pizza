import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().email('Некорректный email').required('Обязательное поле'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
    //repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})