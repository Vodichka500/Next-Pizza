'use client'

import {useFormik} from "formik";
import * as Yup from "yup";
import changePassword from "@/app/actions";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import OrdersHistory from "@/components/ordersHistory/OrdersHistory";
const Profile = ({user}) => {
    const date = new Date(user.createdAt)

    const formik = useFormik({
        initialValues:{
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Поле обязательно для заполнения").min(6, "Минимальная длина 6 символов"),
            newPassword: Yup.string().required("Поле обязательно для заполнения").min(6, "Минимальная длина 6 символов"),
            confirmPassword: Yup.string().required("Поле обязательно для заполнения").oneOf([Yup.ref("newPassword")], "Пароли не совпадают")
        }),
        onSubmit: async (values) => {
            formik.resetForm()
            const res = await changePassword(values)
            if(!res){
                formik.setErrors({oldPassword: "Неверный пароль или пользователь не найден"})
            } else {
                toast.success("Пароль успешно изменен")
            }
        }
    })

    return (
        <div className="container mx-auto py-10 min-h-screen grid grid-cols-3 gap-24">
            <div>
                <div>
                    <h1 className="text-3xl font-bold">Профиль</h1>
                    <div className="mt-5 text-lg">
                        <p><span className="font-bold">Имя: </span>{user.fullname}</p>
                        <p><span className="font-bold">Email: </span>{user.email}</p>
                        <p><span
                            className="font-bold">Дата создания аккаунта: </span>{date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}
                        </p>
                    </div>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit} className="max-w-md mt-20">
                        <h2 className="text-2xl font-bold mt-5">Изменить пароль</h2>
                        <div className="mt-5">
                            <Label
                                htmlFor="oldPassword"
                                className="block my-1 text-lg">
                                Старый пароль
                            </Label>
                            <Input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                onChange={formik.handleChange}
                                value={formik.values.oldPassword}/>
                            {formik.errors.oldPassword && formik.touched.oldPassword &&
                                <div className="text-red-500">{formik.errors.oldPassword}</div>}
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="newPassword" className="block my-1 text-lg">Новый пароль</Label>
                            <Input type="password" id="newPassword" name="newPassword" className="input"
                                   onChange={formik.handleChange} value={formik.values.newPassword}/>
                            {formik.errors.newPassword && formik.touched.newPassword ?
                                <p className="text-red-500">{formik.errors.newPassword}</p> : null}
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="confirmPassword" className="block my-1 text-lg">Повторите новый
                                пароль</Label>
                            <Input type="password" id="confirmPassword" name="confirmPassword" className="input"
                                   onChange={formik.handleChange} value={formik.values.confirmPassword}/>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                                <p className="text-red-500">{formik.errors.confirmPassword}</p> : null}
                        </div>
                        <Button variant="outline" type="submit" className="mt-5">Изменить пароль</Button>
                    </form>
                </div>
            </div>
            <div className="col-span-2 ">
                <OrdersHistory user={user} />
            </div>
        </div>
    );
}
export default Profile