"use client";

import { useForm } from "react-hook-form";
import { LoginData } from '../../../types/api/manager';
import useManagerLoginMutation from '../../../hooks/useManagerLoginMutation';
import Button from '../../../components/common/Button';

const ManagerLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const mutation = useManagerLoginMutation();

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">

    <div className="flex">
      <div className="w-96 m-20 mx-auto justify-center">
        <div className="">
          <h1 className="text-2xl font-bold">로그인</h1>
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium">이메일</label>
          <input
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              maxLength: {
                value: 50,
                message: "이메일을 50자 이내로 입력해 주세요.",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "올바른 이메일 주소를 입력해주세요",
              },
            })}
            className="w-full mt-1 p-2 border rounded input-style"
          />
          {errors.email && (
            <p className="m-1 text-rose-400 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="my-2">
          <label className="block text-sm font-medium">비밀번호</label>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 6,
                message: "비밀번호를 6자 이상 입력해 주세요.",
              },
              maxLength: {
                value: 20,
                message: "비밀번호를 20자 이내로 입력해 주세요.",
              },
            })}
            className="w-full mt-1 p-2 border rounded input-style"
          />
          {errors.password && (
            <p className="m-1 text-rose-400 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
            <div className="my-4 flex">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="justify-center"
              >
                {mutation.isPending ? "로그인 중..." : "로그인"}
              </Button>
            </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default ManagerLoginPage;