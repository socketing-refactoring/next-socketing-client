const tokenErrorMessage = "로그인 세션이 만료되었습니다. 다시 로그인해주세요.";

export const registerErrorMessages = {
  validation: {
    emailInvalid: "이메일 형식이 올바르지 않습니다.",
    passwordInvalid: "비밀번호는 6글자 이상이어야 합니다.",
  },
  duplicateUser: "이미 가입된 사용자입니다.",
  generic: "회원가입에 실패하였습니다.",
};

export const cancelOrderErrorMessages = {
  success: "주문이 성공적으로 취소되었습니다.",
  unauthorized: tokenErrorMessage,
  notFound: "티켓을 찾을 수 없습니다.",
  alreadyCanceled: "이 티켓은 이미 취소되었습니다.",
  internalServerError:
    "서버 내부 오류가 발생했습니다. 나중에 다시 시도해주세요.",
};

export const loginErrorMessages = {
  validation: {
    emailInvalid: "이메일을 입력해주세요.",
    passwordInvalid: "비밀번호를 입력해주세요.",
  },
  noMatch: "조회되지 않는 유저입니다. 회원가입해주세요.",
  generic: "로그인에 실패하였습니다.",
};

export const fetchErrorMessages = {
  isLoading: "데이터를 불러오는 중...",
  general: "오류가 발생했습니다.",
  noEventData: "오류 발생: 공연 정보를 불러올 수 없습니다.",
  noSeatsData: "오류 발생: 좌석 정보를 불러올 수 없습니다.",
  noSvgData: "오류 발생: 좌석 배치도를 불러올 수 없습니다.",
  noReservationData: "오류 발생: 예약 정보를 불러올 수 없습니다.",
};

export const postEventErrorMessages = {
  invalidToken: tokenErrorMessage,
  general: "공연 등록에 실패하였습니다. 다시 시도해주세요.",
};

export const deleteEventErrorMessages = {
  invalidToken: tokenErrorMessage,
  inValidevent: "이벤트 정보가 유효하지 않습니다.",
  general: "공연 삭제에 실패하였습니다. 다시 시도해주세요.",
};

export const postSeatErrorMessages = {
  invalidToken: tokenErrorMessage,
  general: "좌석 정보 등록에 실패하였습니다. 다시 시도해주세요.",
  validation: "입력 형식이 잘못되었습니다. 다시 시도해주세요.",
  inValidevent: "이벤트 정보가 유효하지 않습니다.",
  duplicatesSeat: "같은 위치에 좌석 정보가 중복됩니다.",
};

export const postReservationErrorMessages = {
  invalidToken: tokenErrorMessage,
  general: "예매에 실패하였습니다. 다시 시도해주세요.",
  reserved: "이미 예매된 좌석입니다.",
};

export const managerPageErrorMessages = {
  isLoading: "관리자 페이지를 위한 데이터를 불러오는 중...",
  general: "접근 권한이 없습니다.",
  noEventData: "오류 발생: 공연 정보를 불러올 수 없습니다.",
};
