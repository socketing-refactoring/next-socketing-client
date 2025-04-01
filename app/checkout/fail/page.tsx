"use client"

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const FailPage = () => {
  const searchParams = useSearchParams(); // searchParams는 URLSearchParams 객체입니다.

  const code = searchParams.get("code") ?? "알 수 없음";
  const message = searchParams.get("message") ?? "알 수 없음";

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${code}`}</p>
        <p>{`실패 사유: ${message}`}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage />
    </Suspense>
  );
}
