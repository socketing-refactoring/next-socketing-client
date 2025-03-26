import React from "react";

interface ReservationLayoutProps {
  topContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightMiddleContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
}

const ReservationLayout = ({
  topContent,
  centerContent,
  rightTopContent,
  rightMiddleContent,
  rightBottomContent,
}: ReservationLayoutProps) => {
  return (
    <div className="flex flex-col md:h-[calc(100vh-76px)]">
      <div className="relative w-full h-32">{topContent}</div>

      <div className="flex md:flex-1 flex-col md:flex-row">
        {/* 센터 콘텐츠 */}
        <div className="md:flex-1 h-[360px] md:h-[calc(100vh-240px)] px-5 md:px-10 py-3">
          {centerContent}
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="w-full md:w-[300px] flex flex-col gap-6 px-10 md:px-5 py-2 bg-gray-50 h-full">
          <div className="hidden md:block border-b h-[130px]">
            {rightTopContent}
          </div>
          <div className="p-1 h-[160px]">{rightMiddleContent}</div>
          <div className="h-[30px]">{rightBottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ReservationLayout;
