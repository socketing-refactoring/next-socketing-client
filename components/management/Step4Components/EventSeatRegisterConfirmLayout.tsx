import React from "react";

interface EventSeatRegisterConfirmLayoutProps {
  topContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
}

const EventSeatRegisterConfirmLayout = ({
  topContent,
  centerContent,
  rightTopContent,
  rightBottomContent,
}: EventSeatRegisterConfirmLayoutProps) => {
  return (
    <div className="flex flex-col h-screen md:h-full">
      <div className="relative w-full h-36">{topContent}</div>

      <div className="flex md:flex-1 flex-col md:flex-row">
        {/* 센터 콘텐츠 */}
        <div className="md:flex-1 md:h-[calc(100vh-200px)] px-2 md:px-10 py-2">
          {centerContent}
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="w-full md:w-[250px] flex flex-col gap-4 px-10 md:px-5 py-5 bg-gray-50">
          <div className="hidden md:block border-b pb-2 h-[200px]">
            {rightTopContent}
          </div>
          <div className="p-1 h-[200px]">{rightBottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default EventSeatRegisterConfirmLayout;
