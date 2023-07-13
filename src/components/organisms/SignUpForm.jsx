import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { instance } from "../../services/apis";
import { useState } from "react";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import ValidMessage from "../atoms/ValidMessage";
import Title from "../atoms/Title";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  width: 400px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  padding: 0 8px;

  & > Button {
    margin-top: 24px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  column-gap: 6px;
  width: 100%;

  & > Button {
    width: 40%;
  }
`;

const EMAIL_REG = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

const SignUpForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    trigger,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // 이메일
  const handleEmailChange = () => {
    const email = watch("email");
    setIsEmailValid(false);

    if (!email) {
      return setError("email", { message: "필수 정보입니다." });
    }

    if (!EMAIL_REG.test(email)) {
      setError("email", {
        message: "이메일 형식으로 작성해주세요.",
      });
    } else {
      clearErrors("email");
    }
  };
  const checkDupEmail = async (email) => {
    trigger("email");
    if (!email) {
      return setError("email", { message: "필수 정보입니다." });
    }
    try {
      const response = await instance.post("/check", { email });
      if (response.data.success) {
        setIsEmailValid(true);
      }
    } catch (error) {
      setIsEmailValid(false);
      const errorMsg = error.response.data.error.message;
      if (errorMsg.slice(-5) === "email") {
        setError("email", {
          message: errorMsg.slice(0, -6).concat("."),
        });
      } else {
        setError("email", {
          message: "이미 사용 중인 이메일(아이디)입니다.",
        });
      }
    }
  };

  // 이름
  const handleUsernameChange = () => {
    const username = watch("username");

    if (!username) {
      return setError("username", { message: "필수 정보입니다." });
    } else {
      clearErrors("username");
    }
  };

  // 비밀번호
  const handlePasswordChange = () => {
    const password = watch("password");

    if (!password) {
      return setError("password", { message: "필수 정보입니다." });
    }

    if (!PASSWORD_REG.test(password)) {
      setError("password", {
        message:
          "공백 없이 8자 ~ 20자로 영문, 숫자, 특수문자를 포함해야 합니다.",
      });
    } else {
      clearErrors("password");
    }

    if (watch("password") !== watch("passwordConfirm")) {
      setError("passwordConfirm", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordConfirm");
    }
  };

  // 비밀번호 확인
  const handlePasswordConfirmChange = () => {
    if (watch("password") !== watch("passwordConfirm")) {
      setError("passwordConfirm", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordConfirm");
    }
  };

  // 가입하기
  const onSumbit = async ({ email, username, password }) => {
    try {
      await instance.post("/join", {
        email,
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      const errorMsg = error.response.data.error.message;
      console.log(errorMsg);
    }
  };

  return (
    <Container>
      <Title>가입을 시작합니다!</Title>
      <Row>
        <InputGroup
          id="email"
          title="이메일(아이디)"
          type="email"
          placeholder="이메일"
          register={register("email", {
            required: "필수 정보입니다.",
            pattern: {
              value: EMAIL_REG,
              message: "이메일 형식으로 작성해주세요.",
            },
            onChange: handleEmailChange,
          })}
        />
        <Button onClick={() => checkDupEmail(watch("email"))}>중복 확인</Button>
      </Row>
      {errors?.email?.message ? (
        <ErrorMessage>{errors.email.message}</ErrorMessage>
      ) : !isEmailValid ? null : (
        <ValidMessage>사용 가능한 이메일(아이디)입니다.</ValidMessage>
      )}

      <InputGroup
        id="username"
        title="이름"
        type="text"
        placeholder="이름"
        register={register("username", {
          required: "필수 정보입니다.",
          onChange: handleUsernameChange,
        })}
      />
      {errors?.username?.message ? (
        <ErrorMessage>{errors.username.message}</ErrorMessage>
      ) : null}

      <InputGroup
        id="password"
        title="비밀번호"
        type="password"
        placeholder="비밀번호"
        register={register("password", {
          required: "필수 정보입니다.",
          pattern: {
            value: PASSWORD_REG,
            message:
              "공백 없이 8자 ~ 20자로 영문, 숫자, 특수문자를 포함해야 합니다.",
          },
          onChange: handlePasswordChange,
        })}
      />
      {errors?.password?.message ? (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      ) : null}

      <InputGroup
        id="passwordConfirm"
        title="비밀번호 확인"
        type="password"
        placeholder="비밀번호 확인"
        register={register("passwordConfirm", {
          required: "필수 정보입니다.",
          validate: (v) =>
            v === watch("password") || "비밀번호가 일치하지 않습니다.",
          onChange: handlePasswordConfirmChange,
        })}
      />
      {errors?.passwordConfirm?.message ? (
        <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
      ) : null}

      <Button disabled={!isEmailValid} onClick={handleSubmit(onSumbit)}>
        가입하기
      </Button>
    </Container>
  );
};

export default SignUpForm;
