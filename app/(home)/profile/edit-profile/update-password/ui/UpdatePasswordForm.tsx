"use client"

import { Grid } from "@mui/material"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { passwordValidations } from "utils"
import PasswordField from "../../../../../../components/ui/PasswordField"

type FormInputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>()
  const newPassword = watch("newPassword")
  const currentPassword = watch("currentPassword")

  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })

  const handleClickShowPassword = (field: "current" | "new" | "confirm") => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <form action="#">
      <Grid container={true} spacing={6}>
        <Grid item xs={12} md={12} lg={12} style={{ marginTop: "5%" }}>
          <PasswordField
            label="Contraseña actual"
            register={register("currentPassword", {
              required: "Este campo es requerido",
              validate: passwordValidations.isPassword,
            })}
            errors={errors.currentPassword}
            showPassword={showPassword.current}
            handleClickShowPassword={() => handleClickShowPassword("current")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <PasswordField
            label="Nueva contraseña"
            register={register("newPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (passwordValidations.isPassword(value)) {
                  return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                }
                if (value === currentPassword) {
                  return "La nueva contraseña debe ser diferente de la contraseña actual"
                }
                return true
              },
            })}
            errors={errors.newPassword}
            showPassword={showPassword.new}
            handleClickShowPassword={() => handleClickShowPassword("new")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <PasswordField
            label="Confirmar contraseña"
            register={register("confirmPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (passwordValidations.isPassword(value)) {
                  return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                }
                if (value !== newPassword) {
                  return "Las contraseñas no coinciden"
                }
                if (value === currentPassword) {
                  return "La nueva contraseña debe ser diferente de la contraseña actual"
                }
                return true
              },
            })}
            errors={errors.confirmPassword}
            showPassword={showPassword.confirm}
            handleClickShowPassword={() => handleClickShowPassword("confirm")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>
      </Grid>
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="my-3 flex h-10 w-full items-center justify-center rounded bg-blue-500 text-center text-white"
        style={{ marginTop: "12%", marginBottom: "10%" }}
      >
        Cambiar contraseña
      </button>
    </form>
  )
}
