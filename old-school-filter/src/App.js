import React, { useState } from "react";
import FilterPage from "./FilterPage";
import FilterSider from "./FilterSider";
import "./App.less";
import { Layout, Menu } from "antd";
import { CameraFilled } from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

export const AppContext = React.createContext({});

function App() {
  const [rawImage, setRawImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [curShader, setCurShader] = useState("ORIGINAL");

  return (
    <AppContext.Provider
      value={{
        rawImage,
        setRawImage,
        width,
        setWidth,
        height,
        setHeight,
        curShader,
        setCurShader,
      }}
    >
      <div className="App">
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<CameraFilled />}>
                Old School Filter
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Content
              style={{
                padding: "20px 20px",
                minHeight: document.documentElement.clientHeight - 134,
              }}
            >
              <FilterPage />
            </Content>
            {rawImage ? (
              <Sider
                width={240}
                style={{
                  padding: "20px 20px",
                }}
              >
                <FilterSider />
              </Sider>
            ) : null}
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            Old School Filter ©2020 Created by Wenduo Yue
          </Footer>
        </Layout>
      </div>
    </AppContext.Provider>
  );
}

export default App;
