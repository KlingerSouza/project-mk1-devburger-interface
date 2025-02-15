import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Container, Form, InputContainer, LeftContainer, Link, RightContainer, Title } from "./styles";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import Logo from '../../assets/logo.svg';

export function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const schema = yup.object({
        name: yup.string().required('O nome é obrigatório!'),
        email: yup.string().email('Digite um email válido!').required('O email é obrigatório!'),
        password: yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres!')
            .matches(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra.')
            .matches(/\d/, 'A senha deve conter pelo menos um número.')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial.')
            .required('Digite uma senha!'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'As senhas devem ser iguais!')
            .required('Confirme sua senha!'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        setLoading(true);
        try {
            const response = await api.post('/users', {
                name: data.name,
                email: data.email,
                password: data.password,
            }, {
                validateStatus: () => true,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Cadastro efetuado com sucesso! 😉');
                navigate('/login');
            } else if (response.status === 409) {
                toast.error('Usuário já cadastrado! Faça Login para continuar! 😮');
            } else {
                throw new Error(response.data?.message || 'Erro desconhecido');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Algo deu errado! Tente novamente! 🤯');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburger" />
            </LeftContainer>
            <RightContainer>
                <Title>Criar conta</Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Confirmar senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar conta'}
                    </Button>
                </Form>

                <p>
                    Já possui conta?<Link to='/login'> Clique aqui</Link>
                </p>
            </RightContainer>
        </Container>
    );
}
