/*
TODO:
 Parser는 Client Side에서 사용할 데이터 형태를 미리 정의하고,
 API를 통해 전달받은 객체의 데이터를 미리 정의한 형태로 변환하는 역할을 한다
 Client Side에서 사용할 데이터 형태를 미리 정의함으로써, API 문서가 전달되지 않아도
 미리 정의한 데이터 형태에 맞춰 개발을 진행할 수 있다.
 API와 Parser는 N:N 관계 (혹은 1:N)를 가진다.
 하나의 API는 여러 Parser에서 사용할 수 있으며, Parser는 여러 API를 호출할 수 있다.
 */

import { getMyScheduleParser } from '@/feature/parser/schedule.parser';
export { getMyScheduleParser }
