import React, { useState } from "react";
import FilterPage from "./FilterPage";
import "./App.less";
import { Layout, Menu } from "antd";
import { CameraFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export const AppContext = React.createContext({});

function App() {
  const [rawImage, setRawImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [shaderIndex, setShaderIndex] = useState(0);

  return (
    <AppContext.Provider
      value={{
        rawImage,
        setRawImage,
        width,
        setWidth,
        height,
        setHeight,
        shaderIndex,
        setShaderIndex,
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
                padding: "20px 0px",
                minHeight: document.documentElement.clientHeight - 134,
              }}
            >
              <FilterPage />
            </Content>
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
