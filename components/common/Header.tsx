import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "../member/LoginModal";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const {
    member,
    isLogin,
    setIsLoginModalOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useMemberStore();
  const { resetAuth } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const isOnMyPage = pathname === "/mypage";

  // State to toggle the mobile menu

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    resetAuth();
    toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
    router.push("/");
  };

  const handleRegister = () => {
    setIsMobileMenuOpen(false);
    router.push("/join");
  };

  const openMyPage = () => {
    setIsMobileMenuOpen(false);
    void router.push("/mypage");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex h-[76px] items-center justify-between pl-6 pr-4 py-4 bg-black text-white relative">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex justify-start align-items">
            <Link href="/">
              <div className="text-2xl font-bold">SocKeTing</div>
            </Link>
          </div>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden flex items-center" onClick={toggleMobileMenu}>
          <button className="text-white text-3xl">☰</button>
        </div>

        {/* Login/Logout buttons for larger screens */}
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
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:inline-block"
              >
                로그인
              </Button>
              {/* <Button
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그인
              </Button> */}
            </>
          ) : (
            <>
              <span className="text-white p-2">
                <span className="font-bold">{member.name}</span>님, 안녕하세요
              </span>
              <Button
                onClick={handleLogout}
                variant="dark"
                className="hidden md:inline-block"
              >
                로그아웃
              </Button>

              {/* Mobile Logout button */}
              {/* <Button
                onClick={handleLogout}
                variant="dark"
                size="sm"
                className="md:hidden text-[15px]"
              >
                로그아웃
              </Button> */}
              <Button
                onClick={openMyPage}
                variant="secondary"
                className={`hidden md:inline-block ${isOnMyPage ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                마이 페이지
              </Button>
              {/* Mobile My Page button */}
              {/* <Button
                onClick={openMyPage}
                variant="secondary"
                size="sm"
                className="md:hidden text-[15px]"
              >
                마이 페이지
              </Button> */}
            </>
          )}
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[76px] right-0 w-1/2 bg-black bg-opacity-90 flex justify-center z-50">
          <div className="text-black p-4 rounded-lg shadow-lg">
            {!isLogin ? (
              <>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={handleRegister}
                  className="w-full mb-2"
                >
                  회원가입
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full"
                >
                  로그인
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleLogout}
                  variant="dark"
                  size="sm"
                  className="w-full mb-2"
                >
                  로그아웃
                </Button>
                <Button
                  onClick={openMyPage}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  마이 페이지
                </Button>
              </>
            )}
            {}
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/management")}
              className="w-full mt-2"
            >
              판매자 사이트
            </Button>
          </div>
        </div>
      )}

      <LoginModal />
    </>
  );
};

export default Header;
