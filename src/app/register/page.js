"use client";

import styled from "styled-components";
import TitleHeader from "../ui/utilities/TitleHeader";
import Input from "../ui/essentials/Input";
import Select from "../ui/essentials/Select";
import Button from "../ui/essentials/Button";
import Paragraph from "../ui/essentials/Paragraph";
import Link from "../ui/essentials/Link";
import { FlexContainer } from "../ui/essentials/FlexBox";
import { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { API_URL } from "../utils/settings";

import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validateDateOfBirth,
  validateCareer,
  validateDNI,
} from "../utils/validators";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
`;

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { notify } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    career: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [errors, setErrors] = useState({});
  const [isRegistring, setIsRegistring] = useState(false);
  const [optionsList, setOptionsList] = useState([]);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file,
      });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchCareers = async () => {
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/api/careers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error fetching careers");
      }
      return data;
    } catch (error) {
      console.error("Error fetching careers:", error);
      return [];
    }
  };

  const sendUserData = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("🔴 Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      return await response.json();
    } catch (error) {
      console.error("🔴 Error en la petición:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const careers = await fetchCareers();
      setOptionsList(careers);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistring(true);
    console.log("registrando...", isRegistring);

    // Validaciones simplificadas
    const validationErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
      dateOfBirth: validateDateOfBirth(formData.dateOfBirth),
      career: validateCareer(formData.career, optionsList),
      dni: validateDNI(formData.dni),
    };

    const activeErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([_, value]) => value)
    );

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setIsRegistring(false);
      return;
    }

    try {
      const form = new FormData();
      // Datos básicos
      ["name", "email", "password", "dni"].forEach((field) => {
        form.append(field, formData[field]);
      });

      // Campos especiales
      form.append("career", String(formData.career));
      form.append("birthday", new Date(formData.dateOfBirth).toISOString());

      // Imagen de perfil (¡atención a mayúsculas!)
      if (!(formData.profilePic instanceof File)) {
        throw new Error("Debes seleccionar una foto de perfil válida");
      }
      form.append("Photo", formData.profilePic, formData.profilePic.name);

      const response = await sendUserData(form);

      if (response.success) {
        notify(
          "Tu cuenta ha sido creada con éxito, inicia sesión para continuar",
          "success",
          5000
        );
        router.push("/login");
        return;
      }

      throw new Error(response.message || "Error en el registro");
    } catch (error) {
      setErrors({
        ...activeErrors,
        registerError: error.message,
      });
    } finally {
      console.log("registrando...", isRegistring);
      setIsRegistring(false);
    }
  };

  return (
    <>
      <TitleHeader
        title={"Crea una cuenta"}
        text={"Completa tus datos personales para empezar"}
      />
      <StyledForm onSubmit={handleSubmit}>
        <div className={'w-full'}>
          <Input
            label={"Nombre Completo"}
            value={formData.name}
            onChange={handleChangeInput}
            name={"name"}
            required={true}
            type={"text"}
            
            placeholder="e.g Daniel Alexander Ochoa"
            disabled={isRegistring}
          />
          {errors.name && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.name}{" "}
            </p>
          )}
        </div>

        <div className={'w-full'}>
          <Input
            label={"Correo"}
            name={"email"}
            value={formData.email}
            onChange={handleChangeInput}
            required={true}
            type={"email"}
            
            placeholder="e.g dochoao@gmail.com"
            disabled={isRegistring}
          />
          {errors.email && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.email}{" "}
            </p>
          )}
        </div>

        <div className={'w-full'}>
          <Input
            label={"Fecha de Nacimiento"}
            value={formData.dateOfBirth}
            onChange={handleChangeInput}
            name={"dateOfBirth"}
            required={true}
            type={"date"}
            
            placeholder="DD/MM/YYYY"
            disabled={isRegistring}
          />
          {errors.dateOfBirth && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.dateOfBirth}{" "}
            </p>
          )}
        </div>

        {/* DNI */}
        <div className={'w-full'}>
          <Input
            label={"DNI (Pasaporte para extranjeros)"}
            value={formData.dni}
            onChange={handleChangeInput}
            name={"dni"}
            required={true}
            type={"number"}
            
            placeholder="e.g 12345678"
            disabled={isRegistring}
          />
          {errors.dni && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.dni}{" "}
            </p>
          )}
        </div>

        <div className={'w-full'}>
          <Select
            label={"Carrera"}
            name={"career"}
            value={formData.career}
            onChange={handleChangeInput}
            required={true}
            
            optionsList={optionsList}
            defaultOption={"Seleccione"}
            placeholder="e.g Ingeniería de Sistemas"
            disabled={isRegistring}
          />
          {errors.career && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.career}{" "}
            </p>
          )}
        </div>

        <div className={'w-full'}>
          <Input
            label={"Contraseña"}
            name={"password"}
            value={formData.password}
            onChange={handleChangeInput}
            type={"password"}
            required={true}
            
            placeholder="Crea una contraseña segura"
            disabled={isRegistring}
          />
          {errors.password && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.password}{" "}
            </p>
          )}
        </div>

        <div className={'w-full'}>
          <Input
            label={"Confirmar contraseña"}
            name={"confirmPassword"}
            value={formData.confirmPassword}
            onChange={handleChangeInput}
            type={"password"}
            required={true}
            
            placeholder="Confirma tu contraseña"
            disabled={isRegistring}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.confirmPassword}{" "}
            </p>
          )}
        </div>

        <FlexContainer direction="column" gap="10px" alignitems={"center"}>
          <Input
            label={"Foto de perfil"}
            name={"profilePic"}
            onChange={handleUploadFile}
            type={"file"}
            required={true}
            
            placeholder="Sube tu foto"
            accept="image/*"
            disabled={isRegistring}
          />
          {/* previsualizador */}
          {formData.profilePic && (
            <PreviewImage
              src={URL.createObjectURL(formData.profilePic)}
              alt="Visualizador de imagen"
            />
          )}
          {errors.profilePic && (
            <p style={{ color: "red", size: "14px", float: "left" }}>
              {" "}
              {errors.profilePic}{" "}
            </p>
          )}
        </FlexContainer>

        <FlexContainer
          width="100%"
          justifycontent={"center"}
          alignitems={"center"}
        >
          <Button
            disabled={isRegistring}
            type="submit"
            borderRadius={"30px"}
            width={"90%"}
            text={isRegistring ? "Registrando..." : "Registrar"}
          />
        </FlexContainer>
        {errors.registerError && (
          <p style={{ color: "red", size: "14px", float: "left" }}>
            {" "}
            {errors.registerError}{" "}
          </p>
        )}
        <FlexContainer
          width="100%"
          justifycontent={"center"}
          alignitems={"center"}
          gap="5px"
        >
          <Paragraph
            color={theme.colors.secondaryText}
            weight={"600"}
            size={"13px"}
            text={"¿Ya tienes una cuenta?"}
          />
          <Link
            href="/login"
            text={"Inicia Sesión"}
            color={theme.colors.primary}
            size={"13px"}
            weight={"600"}
            float={"none"}
          />
        </FlexContainer>
       </StyledForm>
    </>
  );
}
