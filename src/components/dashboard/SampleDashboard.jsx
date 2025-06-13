import { CardList } from "../ui/Card.jsx";
import { Chart } from "../ui/Chart.jsx";
import { PollList } from "../ui/Poll.jsx";
import sampleVideo from "../../assets/mocks/sample.mp4";
import { chartData } from "../../assets/mocks/chart.json.js";
import { pollData } from "../../assets/mocks/poll.json.js";
import { cards } from "../../assets/mocks/cards.json.js";
import { Grid } from "../ui/Grid.jsx";
import { gridData } from "../../assets/mocks/grid.json.js";
import { useRef, useState } from "react";
import { Alert, Confirm } from "../ui/Modal.jsx";
import { Button, FileField } from "../ui/input/Input.jsx";
import { Paginator } from "../ui/Paginator.jsx";
import { Video } from "../ui/Video.jsx";
import { title } from "../../utils/window.js";
import { LmsCalendar } from "../ui/LmsCalendar.jsx";
import { Section } from "../Section.jsx";
import { IconButton } from "../ui/input/IconButton.jsx";
import { icons } from "../ui/input/icons.js";

const SampleDashboard = () => {
  title("DashBoard!");

  const [activePage, setActivePage] = useState(0);

  const normalGridRef = useRef();
  const gridRef = useRef();
  const checkedGridRef = useRef();
  const editableGridRef = useRef();

  const fileRef = useRef();
  const alertRef = useRef();
  const alertRef2 = useRef();
  const confirmRef = useRef();
  const confirmRef2 = useRef();

  const [content, setContent] = useState(gridData.content);
  const changeContentHandler = (rowIndex, index, newText) => {
    setContent((prevContent) => {
      const newContent = [...prevContent];
      newContent[rowIndex][index].value = newText;
      return newContent;
    });
  };
  return (
    <>
      <div>
        <Section title="Sample Calendar">
          <LmsCalendar height="auto" viewHoliday={true} />
        </Section>
        <Section title="Sample Video">
          <Video
            src={sampleVideo}
            title="Test Video"
            description={<div>샘플 비디오 입니다. 어쩌고 저쩌고 블라블라</div>}
            uploadDate="2025년 12월 31일"
            uploadTime="23시 11분 46초"
            tags={["Sample", "React", "Spring", "Javascript", "ECMA"]}
            cc={[
              {
                start: 0.000001,
                end: 5.123451,
                caption: "안녕하세요.<div>를 </div> 이렇게 쓰세요.",
              },
              {
                start: 3.000001,
                end: 6.123451,
                caption: "반갑습니다.",
              },
            ]}
          />
        </Section>

        <Section title="Sample Buttons">
          <IconButton color="#666" icon={icons.add}>
            추가
          </IconButton>
          <IconButton color="#666" icon={icons.edit}>
            수정
          </IconButton>
          <IconButton color="#666" icon={icons.close}>
            닫기
          </IconButton>
          <IconButton color="#666" icon={icons.setting}>
            설정
          </IconButton>
          <IconButton color="#666" icon={icons.fullStar}>
            즐겨찾기(완료)
          </IconButton>
          <IconButton color="#666" icon={icons.star}>
            즐겨찾기(미완료)
          </IconButton>
          <IconButton color="#666" icon={icons.login}>
            로그인
          </IconButton>
          <IconButton color="#666" icon={icons.logout}>
            로그아웃
          </IconButton>
          <IconButton color="#666" icon={icons.download}>
            다운로드
          </IconButton>
          <IconButton color="#666" icon={icons.downloadDone}>
            다운로드 완료
          </IconButton>
          <IconButton
            color="#666"
            alwaysIconRotate={true}
            icon={icons.progress}
          >
            진행중
          </IconButton>
          <IconButton color="#666" icon={icons.delete}>
            삭제
          </IconButton>
          <IconButton color="#666" hoverIconRotate={true} icon={icons.refresh}>
            새로고침
          </IconButton>
          <IconButton color="#666" icon={icons.sort}>
            정렬
          </IconButton>
          <IconButton
            color="#666"
            backgroundColor="transparent"
            icon={icons.add}
          >
            추가
          </IconButton>
          <IconButton color="#666" icon={icons.add} />

          <IconButton color="#666">아이콘 없는 버튼</IconButton>
        </Section>

        <Section title="Sample Modals">
          <Alert
            ref={alertRef}
            title="Test Modal!"
            content="hahahahah ahahahahahaha ahahahahah"
          />
          <Alert
            ref={alertRef2}
            title="Test Modal!"
            draggable={true}
            content="hahahahah ahahahahahaha ahahahahah"
          >
            <ul>
              <li>Test 1</li>
              <li>Test 2</li>
            </ul>
          </Alert>
          <Confirm
            ref={confirmRef}
            title="Test Modal!"
            content="hahahahah ahahahahahaha ahahahahah"
            positiveButtonText="확인"
            negativeButtonText="취소"
            onClickPositive={() => {
              alert("OK!");
            }}
            onClickNegative={() => {
              alert("Cancel");
            }}
          />
          <Confirm
            ref={confirmRef2}
            title="Test Modal!"
            draggable={true}
            content="hahahahah ahahahahahaha ahahahahah"
          >
            asdfdsfssdf
          </Confirm>
          <Button
            text="Open Modal"
            onClick={() => {
              alertRef.current.open();
            }}
          />
          <Button
            text="Open Modal2"
            onClick={() => {
              alertRef2.current.open();
            }}
          />
          <Button
            text="Open Confirm"
            onClick={() => {
              confirmRef.current.open();
            }}
          />
          <Button
            text="Open Confirm2"
            onClick={() => {
              confirmRef2.current.open();
            }}
          />
        </Section>

        <Section title="Sample FileInput">
          <div>
            <FileField
              preview={true}
              ref={fileRef}
              id="fileField"
              multiple={true}
              name="file"
              labelText="첨부파일"
            />
          </div>
        </Section>

        <Section title="Sample Grids">
          <Grid
            ref={editableGridRef}
            title="Editable Test Grid"
            checkable={true}
            checkValue="id"
            columnStyle={gridData.columnStyle}
            header={gridData.header}
            content={content}
            footer={<div>abcd</div>}
            style={{
              margin: "10px 0px",
            }}
            editable={true}
            clickableColumn={{
              0: (value) => {
                alert(value);
              },
              1: (value) => {
                alert(value);
              },
            }}
            onChange={changeContentHandler}
          />

          <Grid
            ref={checkedGridRef}
            title="Editable + Checkable Test Grid"
            checkable={true}
            checkValue="id"
            header={gridData.header}
            content={content}
            style={{
              margin: "10px 0px",
            }}
            editable={true}
            clickableColumn={{
              0: (value) => {
                alert(value);
              },
            }}
            onChange={changeContentHandler}
          />
          <button
            type="button"
            onClick={() => {
              checkedGridRef.current.allCheck();
            }}
          >
            Check All
          </button>
          <button
            type="button"
            onClick={() => {
              const items = checkedGridRef.current.getChecked();
              console.log(items);
            }}
          >
            Get Checked Items
          </button>

          <Grid
            ref={gridRef}
            title="Clickable Test Grid"
            columnStyle={gridData.columnStyle}
            header={gridData.header}
            content={content}
            style={{
              margin: "20px 0px",
            }}
            clickableColumn={{
              0: (value) => {
                alert(value);
              },
            }}
            onChange={changeContentHandler}
          />

          <Grid
            ref={normalGridRef}
            title="Test Grid"
            header={gridData.header}
            content={content}
            style={{
              margin: "10px 0px",
            }}
          />
        </Section>

        <Section title="Sample Paginator">
          <Paginator
            id="grid-paginator"
            start={parseInt(activePage / 10) * 10}
            countPerPageGroup={10}
            activePage={activePage}
            setActivePage={setActivePage}
            totalPageCount={101}
          />
        </Section>

        <Section title="Sample Card List">
          <CardList cards={cards} ellipsisLine={3} lineHeight={1.5} />
        </Section>

        <Section title="Sample Chart">
          <Chart
            type="bar"
            height={350}
            categories={chartData.categories}
            series={chartData.series}
          />
        </Section>

        <Section title="Sample Poll">
          <PollList
            title={pollData.title}
            description={pollData.description}
            pollItemList={pollData.pollItemList}
          />
        </Section>
      </div>
    </>
  );
};
export default SampleDashboard;
