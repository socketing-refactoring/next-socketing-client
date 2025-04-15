import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";
import useManagerStore from "../../store/manager/useManagerStore";

const ManagementHeader = () => {
  const { resetAuth } = useAuth();
  const { manager, isManagerLogin } = useManagerStore();

  const router = useRouter();
  const handleLogout = () => {
    resetAuth();
    toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/management/join");
  };

  return (
    <>
      <header className="flex h-[76px] items-center justify-between pl-6 pr-4 py-4 bg-rose-400 text-white">
        {" "}
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex justify-start align-items">
            <Link href="/management">
              <div className="text-2xl font-bold">SocKeTing</div>
            </Link>
          </div>
        </div>
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="hidden md:flex ml-2 space-x-1 sm:w-full md:w-[70%] lg:w-[60%] items-center justify-end">
          <button className="flex items-center space-x-2 bg-rose-500 text-white py-2 px-4 rounded-full hover:bg-rose-600 transition duration-300">
            <Link href="/" className="hover:underline">
              일반 사이트
            </Link>
          </button>

          {!isManagerLogin ? (
            <>
              <Button
                variant="dark"
                onClick={() => handleRegister()}
                className="hidden md:inline-block"
              >
                회원가입
              </Button>
              <Button
                variant="dark"
                onClick={() => handleRegister()}
                size="sm"
                className="md:hidden text-[15px]"
              >
                회원가입
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/management/login")}
                className="hidden md:inline-block"
              >
                로그인
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/management/login")}
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그인
              </Button>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-white p-2">
                <span className="font-bold">{manager.name}</span>님, 안녕하세요
              </span>
              <Button
                onClick={handleLogout}
                variant="dark"
                className="hidden md:inline-block"
              >
                로그아웃
              </Button>

              {/* 모바일 */}
              <Button
                onClick={handleLogout}
                variant="dark"
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그아웃
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default ManagementHeader;
