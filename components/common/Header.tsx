import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add the necessary CSS
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "../member/LoginModal";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { member, isLogin, setIsLoginModalOpen } = useMemberStore();
  const { resetAuth } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const isOnMyPage = pathname === "/mypage";
  const handleLogout = () => {
    resetAuth();
    toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/join");
  };

  const openMyPage = () => {
    void router.push("/mypage");
  };

  return (
    <>
      <header className="flex h-[76px] items-center justify-between pl-6 pr-4 py-4 bg-black text-white">
        {" "}
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex justify-start align-items">
            <Link href="/">
              <div className="text-2xl font-bold">SocKeTing</div>
            </Link>
          </div>
        </div>
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="hidden md:flex ml-2 space-x-1 sm:w-full md:w-[70%] lg:w-[60%] items-center justify-end">
          <button className="flex items-center space-x-2 bg-rose-500 text-white py-2 px-4 rounded-full hover:bg-rose-600 transition duration-300">
            <Link href="/management" className="hover:underline">
              판매자 사이트
            </Link>
          </button>

          {!isLogin ? (
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
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:inline-block"
              >
                로그인
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그인
              </Button>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-white p-2">
                <span className="font-bold">{member.name}</span>님, 안녕하세요
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
              <Button
                onClick={openMyPage}
                variant="secondary"
                className={`hidden md:inline-block ${isOnMyPage ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                마이 페이지
              </Button>
              {/* 모바일 */}
              <Button
                onClick={openMyPage}
                variant="secondary"
                size="sm"
                className="md:hidden text-[15px]"
              >
                마이 페이지
              </Button>
            </>
          )}
        </div>
      </header>
      {/* LoginModal과 JoinModal은 별도로 관리 */}
      <LoginModal />
    </>
  );
};

export default Header;
