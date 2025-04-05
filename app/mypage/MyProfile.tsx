import React, { useState, useEffect } from "react";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "../../components/common/Button";
import useNicknameUpdateMutation from "../../hooks/useNicknameUpdateMutation";
import useMemberRetrievalQuery from "../../hooks/useMemberRetrievalQuery";
import LoadingPage from "../loading/page";
import ErrorPage from "../error/page";
import { fetchErrorMessages } from "../../constants/errorMessages";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    nickname: "",
    email: "",
  });
  const { member } = useMemberStore();
  const { data, isLoading, isError } = useMemberRetrievalQuery(member.id);
  const updateNicknameMutation = useNicknameUpdateMutation();

  useEffect(() => {
    if (data?.data) {
      setProfileData({
        nickname: data.data.nickname,
        email: data.data.email,
      });
    }
  }, [data]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!data?.data)
    return <ErrorPage errorMessage={fetchErrorMessages.noMemberData} />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname") {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNicknameUpdate = () => {
    const { nickname } = profileData;
    if (!member.id || !nickname.trim()) return;

    updateNicknameMutation.mutate({
      memberId: member.id,
      newNickname: nickname,
    });
  };
  return (
    <div className="mx-auto p-8 border border-gray-300 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">나의 프로필</h2>

      {/* 이메일 */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          이메일
        </label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
          {profileData.email}
        </p>
      </div>
      {/* 닉네임 */}
      <div className="mb-6">
        <label
          htmlFor="nickname"
          className="block text-gray-700 font-medium mb-2"
        >
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={profileData.nickname}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>

      {/* 수정 버튼 */}
      <Button onClick={() => void handleNicknameUpdate()}>수정</Button>
    </div>
  );
};

export default MyProfile;
