import React from "react";

interface EventSeatRegisterLayoutProps {
  topContent: React.ReactNode;
  leftSidebarContent?: React.ReactNode;
  centerContent: React.ReactNode;
  rightTopContent: React.ReactNode;
  rightBottomContent: React.ReactNode;
  isLeftSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const EventSeatRegisterLayout = ({
  topContent,
  leftSidebarContent,
  centerContent,
  rightTopContent,
  rightBottomContent,
  isLeftSidebarOpen = false,
  toggleSidebar,
}: EventSeatRegisterLayoutProps) => {
  return (
    <div className="flex flex-col" style={{ height: "500px" }}>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="py-4 w-full bg-white border-b">
          {topContent}
          <div className="my-2">부대 시설을 지정하고 구역을 설정해 주세요.</div>
        </div>
        <div className="flex flex-1 flex-col md:flex-row">
          <div
            className={`transition-transform duration-300 md:w-1/5 bg-white border-r relative ${
              isLeftSidebarOpen ? "block" : "hidden"
            }`}
          >
            {leftSidebarContent}
          </div>

          <div className="flex-1 relative">
            <button
              onClick={toggleSidebar}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 
                rounded-r-lg shadow-md hover:bg-gray-50 transition-colors border border-l-0"
            >
              {isLeftSidebarOpen ? "◀" : "▶"}
            </button>
            {centerContent}
          </div>

          <div className="hidden md:flex md:w-1/4 flex-col overflow-y-auto bg-white border-l">
            <div className="border-b max-h-[220px]">{rightTopContent}</div>
            <div className="flex-1 p-4 overflow-y-auto">
              {rightBottomContent}
            </div>
          </div>
        </div>
        {/* 아래는 모바일 반응형 */}
        <div className="md:hidden bg-white border-t max-h-64 overflow-y-auto">
          <div className="p-4 border-b">{rightTopContent}</div>
          <div className="p-4">{rightBottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default EventSeatRegisterLayout;
