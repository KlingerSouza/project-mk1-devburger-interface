import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { Container, Form, InputContainer, LeftContainer, Link, RightContainer, Title } from "./styles"
import { Button } from "../../components/Button"
import { api } from "../../services/api";
import Logo from '../../assets/logo.svg'

export function Register() {
    const navigate = useNavigate();

    const schema = yup.object({
        name: yup.string().required('o nome é obrigatório!'),
        email: yup.string().email('digite um Email válido!').required('o Email é obrigatório!'),
        password: yup.string().min(6, 'a senha deve ter pelo menos 6 caracteres!').required('digite uma senha!'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'as senhas devem ser iguais!').required('confirme sua senha!'),
    })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async data => {

        try {
            const { status } =
                await api.post('/users', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                    {
                        validateStatus: () => true,
                    },
                );
            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                toast.success('Cadastro efetuado com sucesso! 😉');
            } else if (status === 409) {
                toast.error('Usuário já cadastrado! faça Login para continuar! 😮')
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error('Algo deu errado! Tente novamente! 🤯')
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

                    <Button type="submit">Criar conta</Button>
                </Form>

                <p>
                    já possui conta?<Link to='/login'> clique aqui</Link>
                </p>
            </RightContainer>
        </Container>
    )
}