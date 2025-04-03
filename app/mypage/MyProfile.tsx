import React, { useState, useEffect } from "react";
import useMemberStore from "../../store/member/useMemberStore";
import { fetchMemberInfo, updateUserNickname } from "../../api/memberApi";
import Button from "../../components/common/Button";
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    nickname: "",
    email: "",
  });
  const { memberId } = useMemberStore();

  const fetchProfile = async () => {
    if (!memberId) return;
    try {
      const data = await fetchMemberInfo(memberId);
      const member = data.data;
      if (member) {
        setProfileData({
          nickname: member.nickname,
          email: member.email,
        });
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    if (memberId) {
      void fetchProfile();
    }
  }, [memberId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNicknameUpdate = async () => {
    if (!memberId) return;
    try {
      const updatedData = await updateUserNickname(
        memberId,
        profileData.nickname
      );
      if (!updatedData) throw new Error("No update");
      toast.success(`새로운 닉네임 : ${updatedData.data?.nickname}`);
    } catch (error) {
      toast.error("닉네임 업데이트 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-8 border border-gray-300 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">나의 프로필</h2>

      {/* 이메일 */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          이메일
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={profileData.email}
          readOnly // 이메일은 수정 불가능
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
        />
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
