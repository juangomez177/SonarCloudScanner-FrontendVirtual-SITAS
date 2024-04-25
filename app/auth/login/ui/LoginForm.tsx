'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Checkbox, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { emailValidations } from 'utils';
import { LogginInterface } from "interfaces/login.interface";

export const LoginForm = () => {

   const router = useRouter()
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<LogginInterface>();

   const onSubmit: SubmitHandler<LogginInterface> = async (data) => {
      setError("");
      setIsLoading(true);
      const result = await signIn('credentials', {
         redirect: false,
         email: data.email,
         password: data.password
      });
      if (result?.error) {
         setError("El nombre de usuario, email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece tu contraseña.");
         setIsLoading(false);
      }
      if (result?.ok) {
         router.push('/');
      }
   }

   return (
      <>

         <div className="flex items-center my-5 mt-10">
            <div className="flex-1 border-t-3 border-gray-300"></div>
            <div className="px-2 text-gray-800">OR</div>
            <div className="flex-1 border-t-3 border-gray-300"></div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3">

            <Grid container={true} spacing={2}>

               <Grid item xs={12}>
                  <TextField
                     label="Correo electrónico"
                     variant="outlined"
                     fullWidth
                     {...register('email', {
                        required: 'Este campo es requerido',
                        validate: emailValidations.isEmail,
                     })}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                  />
               </Grid>

               <Grid item xs={12}>
                  <TextField
                     label="Contraseña"
                     variant="outlined"
                     fullWidth
                     type='password'
                     {...register('password', {
                        required: 'Este campo es requerido',
                     })}
                     error={!!errors.password}
                     helperText={errors.password?.message}
                  />
               </Grid>

               <Grid item xs={12} className="flex items-center" >
                  <Checkbox required />
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                     He leído y acepto los Términos y Condiciones del Programa Singapur Airlines.
                  </Typography>
               </Grid>

               <Grid item xs={12} className="flex items-center" >
                  <Checkbox required />
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                     Autorizo que mis datos sean tratados de acuerdo a la Política de Privacidad.
                  </Typography>
               </Grid>

            </Grid>

            <button className="bg-blue-500 text-center rounded h-10 mb-3 mt-3 flex items-center justify-center text-white">
               {
                  isLoading ? <CircularProgress size={20} color="inherit" /> : 'Log In'
               }
            </button>

            {error && <div className="text-red-500 text-left mb-3">{error}</div>}

            <Link href="/auth/new-account" className='underline text-center mb-5 mt-3'>
               No tienes cuenta? Crear nueva cuenta
            </Link>

         </form>

      </>

   )
}

