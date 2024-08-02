import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import './LoginPage.css'

const LoginPage = () => {
    const schema = z.object({
        email: z.string().email({message: 'Please enter valid email address'}).min(3),
        password: z.string().min(8, {message: 'Password must contain at least 8 character(s)'})
    })
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)})
    const onSubmit = formData => console.log("formdata",formData)
  return (
    <section className="align_center form_page">
        <form action="" className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_inputs">
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="text" className='form_text_input' {...register("email")} placeholder='Enter your name'/>
                    {errors.email && <em className='form_error'>{errors.email.message}</em>}
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id="password" type="password" className='form_text_input' {...register("password")} placeholder='Enter your password'/>
                    {errors.password && <em className='form_error'>{errors.password.message}</em>}
                </div>

                <button type="submit" className='search_button form_submit'>Submit</button>
            </div>
        </form>
    </section>
  )
}

export default LoginPage