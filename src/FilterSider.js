import React, { useState, useContext, useEffect } from "react";
import { Radio, Row, Col } from "antd";
import { AppContext } from "./App";
import { ShaderList } from "./Shaders";
import Filter from "./Filter";

const MAX_WIDTH = 120;
const MAX_HEIGHT = 90;

export default function FilterSider() {
  const { width, height, shaderIndex, setShaderIndex } = useContext(AppContext);
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    setPixelRatio(Math.max(1, width / MAX_WIDTH, height / MAX_HEIGHT));
  }, [width, height]);

  function onChange(value) {
    setShaderIndex(value);
  }

  return (
    <Radio.Group onChange={(e) => onChange(e.target.value)} value={shaderIndex}>
      <Row justify="center" align="middle" gutter={32}>
        {ShaderList.map((item, index) => {
          return (
            <Col key={index} onClick={() => onChange(index)}>
              <Row justify="center">
                <Filter
                  width={width / pixelRatio}
                  height={height / pixelRatio}
                  pixelRatio={pixelRatio}
                  shader={item.shader}
                />
              </Row>
              <Row justify="center">
                <Radio value={index}>{item.name}</Radio>
              </Row>
            </Col>
          );
        })}
      </Row>
    </Radio.Group>
  );
}
