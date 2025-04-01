import { useForm } from "react-hook-form";
import { LoginData } from "../../types/api/member";
import Modal from "../common/Modal";
import Button from "../common/Button";
import useLoginMutation from "../../hooks/useLoginMutation";
import useMemberStore from "../../store/member/useMemberStore";

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useMemberStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onBlur",
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginData) => {
    const loginData: LoginData = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(loginData, {
      onSuccess: () => {
        reset();
        setIsLoginModalOpen(false);
      },
    });
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => {
        setIsLoginModalOpen(false);
      }}
    >
      <div className="mx-auto w-full sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] xl:max-w-[40rem] p-2">
        <p className="text-3xl font-bold text-center">로그인</p>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col px-4">
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
                  <p className="m-1 text-rose-400 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="my-2">
                <label className="block text-sm font-medium">비밀번호</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "비밀번호를 입력해 주세요.",
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
              <div className="my-2 flex justify-center">
                <Button type="submit" className="justify-center">
                  로그인
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
