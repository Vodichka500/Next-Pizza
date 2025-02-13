import * as yup from 'yup';

export default yup.object({
    firstName: yup.string().min(2, 'Минимум 2 символа').max(30, 'Максимум 30 символов').required('Обязательное поле'),
    lastName: yup.string().min(2, 'Минимум 2 символа').max(30, 'Максимум 30 символов').required('Обязательное поле'),
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    phone: yup.string().matches(/^[0-9]{9}$/, 'Некорректный номер. Пример: 123456789').required('Обязательное поле'),
    address: yup.string().required('Обязательное поле'),
    comment: yup.string().max(200, 'Максимум 200 символов'),
    time: yup.string().required('Обязательное поле')
})
