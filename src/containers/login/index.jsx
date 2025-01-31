import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useUser } from "../../hooks/UserContext";

import { Container, Form, InputContainer, LeftContainer, Link, RightContainer, Title } from "./styles";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import Logo from '../../assets/logo.svg';

export function Login() {
    const navigate = useNavigate();
    const { putUserData } = useUser();

    // 📌 Validação do formulário com Yup
    const schema = yup.object({
        email: yup.string().email('Digite um Email válido!').required('O Email é obrigatório!'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres!').required('Digite uma senha!'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            // 📌 Requisição para autenticação com API
            const response = await api.post('/session', {
                email: data.email,
                password: data.password,
            });
    
            // Exibir toast apenas para sucesso do login
            toast.success('Login efetuado com sucesso! 👌');
    
            const userData = response.data;
    
            // 📌 Salva o token de forma segura no localStorage
            localStorage.setItem("devburger_token", userData.token);
            
            // 📌 Atualiza contexto do usuário com os dados corretos
            putUserData(userData);
    
            // 📌 Navegação segura após sucesso
            setTimeout(() => {
                navigate(userData.admin ? '/admin/pedidos' : '/');
            }, 1000);
            
        } catch (error) {
            console.error("Erro ao fazer login:", error);
    
            // 📌 Se for erro da API, exibir mensagem amigável
            if (error.response) {
                toast.error(error.response.data.error || "Acesso negado, verifique seu Email e senha! 🤯");
            } else {
                // Aqui, trata erros de conexão
                toast.error("Erro de conexão. Verifique sua internet.");
            }
        }
    };
    
    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburger" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem-vindo(a) ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu<span> Login e senha.</span>
                </Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
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

                    <Button type="submit">Entrar</Button>
                </Form>

                <p>
                    Não possui conta?<Link to='/cadastro'> Clique aqui</Link>
                </p>
            </RightContainer>
        </Container>
    );
}
