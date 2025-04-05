"use client";

import styled, { useTheme } from "styled-components";
import { useState } from "react";
import Button from "../ui/essentials/Button";
import { FlexContainer } from "../ui/essentials/FlexBox";
import Input from "../ui/essentials/Input";
import Paragraph from "../ui/essentials/Paragraph";
import Link from "../ui/essentials/Link";
import TitleHeader from "../ui/utilities/TitleHeader";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../utils/validators";
import { useRouter } from "next/navigation";
import { useNotification } from "../contexts/NotificationContext";
import { API_URL } from "../utils/settings";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { notify } = useNotification();

  const [working, setWorking] = useState(false);
  const [id, setId] = useState("");
  const [idUser, setIdUser] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [pages, setPages] = useState({
    verifyEmail: true,
    verifyCode: false,
    changePassword: false,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const apiRequest = async (url, method, body) => {
    setWorking(true);
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error desconocido");
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error.message };
    } finally {
      setWorking(false);
    }
  };

  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (working) return;

    setFieldError("email", "");

    const emailError = validateEmail(inputs.email);
    if (emailError) {
      setFieldError("email", emailError);
      return;
    }

    const data = await apiRequest(`${API_URL}/api/management/pwd`, "POST", { email: inputs.email });

    if (data.success) {
      setPages({ verifyEmail: false, verifyCode: true, changePassword: false });
      setId(data.data.idManagement);
      setIdUser(data.data.idUser);
    } else {
      console.error("Error:", data.message);
      setFieldError("email", data.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!id || working) return;

    setFieldError("code", "");

    const data = await apiRequest(`${API_URL}/api/management/${id}/compare`, "PATCH", { code: inputs.code });

    if (data.success) {
      setPages({ verifyEmail: false, verifyCode: false, changePassword: true });
    } else {
      setFieldError("code", data.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (working || !idUser) return;

    setErrors((prev) => ({ ...prev, password: "", confirmPassword: "" }));

    const passwordError = validatePassword(inputs.password);
    const confirmPasswordError = validateConfirmPassword(inputs.password, inputs.confirmPassword);

    if (passwordError || confirmPasswordError) {
      setErrors((prev) => ({
        ...prev,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      }));
      return;
    }

    const data = await apiRequest(`${API_URL}/api/user/password`, "PATCH", {
      id: idUser,
      password: inputs.password,
    });

    if (data.success) {
      notify("Contraseña cambiada con éxito", "success", 5000);
      router.push("/login");
    } else {
      setFieldError("password", data.message);
    }
  };

  return (
    <>
      <TitleHeader
        title="Olvidé mi contraseña"
        text={
          pages.verifyEmail
            ? "Ingresa tu correo para enviarte un código de verificación"
            : pages.verifyCode
              ? "Ingresa el código de verificación que se te envió a tu correo"
              : "Restablece tu contraseña, recuerda que sea segura y fácil de recordar"
        }
      />
      <StyledForm
        onSubmit={
          pages.verifyEmail
            ? handleVerifyEmail
            : pages.verifyCode
              ? handleVerifyCode
              : handleChangePassword
        }
      >
        {pages.verifyEmail && (
          <>
            <Input
              onChange={handleChangeInput}
              label="Correo"
              value={inputs.email}
              type="email"
              name="email"
              placeholder="e.g afcastillof@unah.hn"
            />
            {errors.email && (
              <Paragraph color="red" size="14px" text={errors.email} />
            )}
          </>
        )}

        {pages.verifyCode && (
          <>
            <Input
              onChange={handleChangeInput}
              name="code"
              label="Código de verificación"
              value={inputs.code}
              type="text"
              placeholder="Ingresa el código"
            />

            {errors.code && (
              <Paragraph color="red" size="14px" text={errors.code} />
            )}
          </>
        )}

        {pages.changePassword && (
          <>
            <FlexContainer direction="column" alignitems="center">

              <Input
                onChange={handleChangeInput}
                name="password"
                label="Contraseña"
                value={inputs.password}
                type="password"
                placeholder="Ingresa tu nueva contraseña"
              />
              {errors.password && (
                <Paragraph color="red" size="14px" text={errors.password} />
              )}
            </FlexContainer>

            <FlexContainer direction="column" alignitems="center">
              <Input
                onChange={handleChangeInput}
                name="confirmPassword"
                label="Confirmar Contraseña"
                value={inputs.confirmPassword}
                type="password"
                placeholder="Confirma tu nueva contraseña"
              />
              {errors.confirmPassword && (
                <Paragraph
                  color="red"
                  size="14px"
                  text={errors.confirmPassword}
                />
              )}
            </FlexContainer>
          </>
        )}

        <FlexContainer direction="column" alignitems="center">
          <Button
            disabled={working}
            type="submit"
            text="Siguiente"
            borderRadius="30px"
            width="300px"
          />
        </FlexContainer>

        <FlexContainer direction="column" alignitems="center" gap="10px">
          <FlexContainer
            direction="row"
            alignitems="center"
            justifycontent="center"
            gap="5px"
          >
            <Paragraph
              color={theme.colors.secondaryText}
              weight="600"
              size="13px"
              text="¿Todavía no tienes una cuenta?"
            />
            <Link
              href="/register"
              text="Regístrate"
              color={theme.colors.primary}
              size="13px"
              weight="600"
            />
          </FlexContainer>

          <FlexContainer
            direction="row"
            alignitems="center"
            justifycontent="center"
            gap="5px"
          >
            <Paragraph
              color={theme.colors.secondaryText}
              weight="600"
              size="13px"
              text="Regresar a "
            />
            <Link
              href="/"
              text="la página principal"
              color={theme.colors.primary}
              size="13px"
              weight="600"
            />
          </FlexContainer>
        </FlexContainer>
      </StyledForm>
    </>
  );
}