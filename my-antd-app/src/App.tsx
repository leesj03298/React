// src/App.tsx
import React, { useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Switch,
  ConfigProvider,
  theme as antdTheme,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const { Header, Sider, Content, Footer } = Layout;

type MenuKey = "home" | "apps1" | "apps2" | "settings";

const menuItems = [
  { key: "home", icon: <HomeOutlined />, label: "홈" },
  {
    key: "apps",
    icon: <AppstoreOutlined />,
    label: "앱",
    children: [
      { key: "apps1", label: "앱1" },
      { key: "apps2", label: "앱2" },
    ],
  },
  { key: "settings", icon: <SettingOutlined />, label: "설정" },
];

function PageHome() {
  return <div>대시보드/홈 콘텐츠</div>;
}
function PageApp1() {
  return <div>앱1 내용</div>;
}
function PageApp2() {
  return <div>앱2 내용</div>;
}
function PageSettings() {
  return <div>설정 페이지</div>;
}

function Shell({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antdTheme.useToken();

  const navigate = useNavigate();

  const onMenuClick = (key: string) => {
    if (key === "home") navigate("/");
    if (key === "apps1") navigate("/apps/1");
    if (key === "apps2") navigate("/apps/2");
    if (key === "settings") navigate("/settings");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 좌측 사이드바 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={220}
      >
        {/* 로고 영역 (클릭 시 홈으로 이동) */}
        <div
          onClick={() => navigate("/")}
          style={{
            height: 56,
            margin: 12,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            paddingLeft: collapsed ? 0 : 12,
            background: "rgba(255,255,255,0.2)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <img
            src={logo}
            alt="서울독거노인"
            style={{
              height: 32,
              width: "auto",
              marginRight: collapsed ? 0 : 8,
            }}
          />
          {!collapsed && (
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#fff",
              }}
            >
              서울독거노인
            </span>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          onClick={({ key }) => onMenuClick(key as MenuKey)}
        />
      </Sider>

      {/* 우측 레이아웃 */}
      <Layout>
        {/* 상단 헤더 */}
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <div style={{ fontWeight: 600, flex: 1 }}>내 antd 샘플</div>
          <Switch
            checked={isDark}
            onChange={setIsDark}
            checkedChildren="🌙"
            unCheckedChildren="🌞"
          />
        </Header>

        {/* 중앙 콘텐츠 */}
        <Content style={{ margin: 16, overflow: "auto" }}>
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: "Page" },
              { title: "Current" },
            ]}
            style={{ marginBottom: 12 }}
          />
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/apps/1" element={<PageApp1 />} />
              <Route path="/apps/2" element={<PageApp2 />} />
              <Route path="/settings" element={<PageSettings />} />
            </Routes>
          </div>
        </Content>

        {/* 하단 푸터 */}
        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} My Antd App
        </Footer>
      </Layout>
    </Layout>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 새로고침해도 유지(원치 않으면 이 블록을 true/false로 바꿔도 됨)
    const saved = localStorage.getItem("pref_theme_dark");
    return saved ? JSON.parse(saved) : false;
  });

  // 상태 변화 시 저장
  React.useEffect(() => {
    localStorage.setItem("pref_theme_dark", JSON.stringify(isDark));
  }, [isDark]);

  const themeConfig = useMemo(
    () => ({
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: { colorPrimary: "#1677ff", borderRadius: 10 },
    }),
    [isDark]
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <Shell isDark={isDark} setIsDark={setIsDark} />
      </BrowserRouter>
    </ConfigProvider>
  );
}
