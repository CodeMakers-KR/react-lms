import { useEffect, useState } from "react";
import { fetchStudents } from "../../../https/user/account/userAccount";
import { Section } from "../../Section.jsx";
import { DataGrid } from "../../ui/DataGrid.jsx";
import { IconButton } from "../../ui/input/IconButton.jsx";
import { icons } from "../../ui/input/icons.js";

export const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const studentsList = await fetchStudents();
      setStudents(studentsList.data);
    })();
  }, []);

  const gridItemClickHandler = (id, student) => {
    console.log(id, student);
  };

  return (
    <div
      style={{
        height: "calc(100% - 108px)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          height: "100%",
        }}
      >
        <Section title="수강생 목록" fixed={true} style={{ flexGrow: 7 }}>
          <DataGrid
            headers={[
              { id: "id", title: "ID" },
              { id: "name", title: "Name" },
              { id: "pwdFailCnt", title: "로그인 실패 횟수" },
              { id: "githubUrl", title: "Github URL" },
            ]}
            contents={students}
            clickEvents={{
              id: gridItemClickHandler,
            }}
          />
        </Section>
        <Section title="수강생 상세 정보" fixed={true} style={{ flexGrow: 3 }}>
          <IconButton icon={icons.edit} style={{ marginRight: "0.5rem" }}>
            저장
          </IconButton>
          <IconButton icon={icons.delete} style={{ marginRight: "0.5rem" }}>
            삭제
          </IconButton>
          <IconButton hoverIconRotate={true} icon={icons.refresh}>
            로그인 초기화
          </IconButton>
        </Section>
      </div>
    </div>
  );
};
