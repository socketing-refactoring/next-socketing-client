"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add the necessary CSS
import Link from "next/link";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "../member/LoginModal";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "./Button";

const Header = () => {
  const {
    isLogin,
    setIsLogin,
    setMemberId,
    memberName,
    // memberNickname,
    setMemberName,
    setMemberNickname,
    setIsLoginModalOpen,
  } = useMemberStore();

  // const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const isOnMyPage = pathname === "/mypage";

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("memberName");
    const storedId = localStorage.getItem("memberId");

    if (!token) {
      setIsLogin(false);
      setMemberName(null);
      return;
    }
    if (isTokenExpired(token)) {
      handleLogout();
      return;
    }
    setIsLogin(true);

    if (!storedName || !storedId) {
      console.log("Failed to get user info from local storage");
      return;
    }
    setMemberName(storedName);
    setMemberId(storedId);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) {
        console.log("Failed to get expiration time in the access token");
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > exp;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  // const handleSearch = () => {
  //   if (searchQuery.trim() !== "") {
  //     void router.push(`/search-results/${encodeURIComponent(searchQuery)}`);
  //     setSearchQuery("");
  //   } else {
  //     toast.error("검색어를 입력해주세요");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberName");
    setMemberId(null);
    setMemberName(null);
    setMemberNickname(null);

    setIsLogin(false);
    toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/auth/join");
  };

  const openMyPage = () => {
    void router.push("/mypage");
  };

  return (
    <>
      <header className="flex h-[76px] items-center justify-between pl-6 pr-4 py-4 bg-black text-white">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex justify-start align-items">
            <Link href="/" passHref>
              <div className="text-2xl font-bold">SocKeTing</div>
            </Link>
          </div>
        </div>
        {/* 조건부 검색창 */}
        {/* {shouldShowSearch && <SearchBar onSearch={handleSearch} />}{" "} */}
        {/* 검색창 렌더링 */}
        {/* 로그인/로그아웃 상태에 따른 버튼 */}
        <div className="flex ml-2 space-x-1 sm:w-full md:w-[70%] lg:w-[60%] items-center justify-end">
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
              <span className="hidden md:inline text-white pr-2">
                <span className="font-bold">{memberName}</span>님, 안녕하세요
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
