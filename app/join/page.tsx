"use client";

import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import { JoinFormData, useJoinMutation } from "../../hooks/useJoinMutation";

const JoinPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>();

  const mutation = useJoinMutation();

  const onSubmit = (data: JoinFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex">
      <div className="w-96 m-20 mx-10 justify-center">
        <div className="">
          <h1 className="text-2xl font-bold">회원가입</h1>
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium">이름</label>
          <input
            {...register("name", {
              required: "이름을 입력해 주세요.",
              maxLength: {
                value: 20,
                message: "이름을 20자 이내로 입력해 주세요.",
              },
            })}
            className="w-full mt-1 p-2 border rounded input-style"
          />
          {errors.name && (
            <p className="m-1 text-rose-400 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="my-2">
          <label className="block text-sm font-medium">닉네임</label>
          <input
            {...register("nickname", {
              required: "닉네임을 입력해 주세요.",
              maxLength: {
                value: 20,
                message: "닉네임을 20자 이내로 입력해 주세요.",
              },
            })}
            className="w-full mt-1 p-2 border rounded input-style"
          />
          {errors.nickname && (
            <p className="m-1 text-rose-400 text-sm">
              {errors.nickname.message}
            </p>
          )}
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
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="my-4 flex">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="justify-center"
              >
                {mutation.isPending ? "가입 중..." : "가입하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
